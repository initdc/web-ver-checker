#!/usr/bin/env ruby

require 'net/http'
require 'net/https'
require 'json'

def origin_version
    uri = URI('https://api.kodcloud.com/?app%2Fversion')

    # Create client
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_PEER

    # Create Request
    req =  Net::HTTP::Get.new(uri)
    # Add headers

    # Fetch Request
    res = http.request(req)

    puts "Response HTTP Status Code: #{res.code}"
    # puts "Response HTTP Response Body: #{res.body}"

    j = JSON.parse(res.body)
    return j["data"]["server"]["version"]

rescue StandardError => e
    puts "HTTP Request failed (#{e.message})"
end


def compare_version(version)

    base = 'https://api.github.com/repos/pliplive/kodbox/git/refs/tags/'
    uri = URI(base+version)

    # Create client
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_PEER

    # Create Request
    req =  Net::HTTP::Head.new(uri)
    # Add headers
    req.add_field "accept", "application/vnd.github.v3+json"

    # Fetch Request
    res = http.request(req)
    puts "Response HTTP Status Code: #{res.code}"
    puts "Response HTTP Response Body: #{res.body}"
rescue StandardError => e
    puts "HTTP Request failed (#{e.message})"
end

def main
    ver = origin_version
    compare_version(ver)
end

main