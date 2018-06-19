
require "erb"
require "prmd"
require "prmd/cli"
require "redcarpet"
require 'rouge'
require 'byebug'
require 'rouge/plugins/redcarpet'
require 'active_support/core_ext/string'
require_relative "./json_schema_external_ref"

class RougeRender < Redcarpet::Render::HTML
  include Rouge::Plugins::Redcarpet
end

def generate_docs_from(name)
  dist = "./dist"
  source = "./source"
  source_path = "#{source}/#{name}.json"
  dest_name = name.gsub(/_/, '-')
  json_schema_path = File.join(dist, "#{dest_name}-hyperschema.json")
  markdown_path = File.join(dist, "#{dest_name}-documentation.md")
  html_path = File.join(dist, "#{dest_name}-documentation.html")

  data = JsonSchemaExternalRef.new(source_path).expanded
  #data = JSON.parse(File.read(source_path))
  json_schema = JSON.pretty_generate(data)

  File.open(json_schema_path, "w") do |file|
    file.write json_schema
  end

  errors = Prmd.verify(data)
  unless errors.empty?
    $stderr.puts(source_path)
    errors.each { |error| $stderr.puts(error) }
    exit(1)
  end


  Prmd::CLI::Doc.execute(
    argv: [json_schema_path],
    output_file: markdown_path
  )

  markdown_content = File.read(markdown_path)


  html_toc = Redcarpet::Markdown.new(
    Redcarpet::Render::HTML_TOC.new
  ).render(markdown_content)

  html_body = Redcarpet::Markdown.new(
    RougeRender.new(with_toc_data: true),
    tables: true,
    fenced_code_blocks: true,
  ).render(markdown_content)

  File.open(html_path, "w") do |file|
    file.write ERB.new(File.read("#{source}/template.html"), nil, "<>").result(binding)
  end

end
generate_docs_from("schema")
