#!/bin/bash

# Constants
SERVICE_URL=http://closure-compiler.appspot.com/compile
NEWFILE="../dist/fnc.min.js"

# Itearate through all files
for f in ../dist/fnc.js
do
	if [ -r ${f} ]
	then
		code="${code} --data-urlencode js_code@${f}"
	else
		echo "File ${f} is not readable. Skipped."
	fi
done

# Send request
curl \
--url ${SERVICE_URL} \
--header 'Content-type: application/x-www-form-urlencoded' \
${code} \
--data output_format=json \
--data output_info=compiled_code \
--data output_info=statistics \
--data output_info=errors \
--data compilation_level=SIMPLE_OPTIMIZATIONS |

python -c '
import json, sys
data = json.load(sys.stdin)

if "errors" in data:
	print "### COMPILATION FAILED WITH ERRORS"
	for err in data["errors"]:
		file = sys.argv[int(err["file"].replace("Input_", "")) + 1]
		print "File: %s, %d:%d" % (file, err["lineno"], err["charno"])
		print "Error: %s" % err["error"]
		print "Line: %s" % err["line"]

	print "\nBuild failed.\n"

else:
	print "### COMPILATION COMPLETED"
	print "Original size: %db, gziped: %db" % (data["statistics"]["originalSize"], data["statistics"]["originalGzipSize"])
	print "Compressed size: %db, gziped: %db" % (data["statistics"]["compressedSize"], data["statistics"]["compressedGzipSize"])
	print "Compression rate: %.2f" % (float(data["statistics"]["compressedSize"]) / int(data["statistics"]["originalSize"]))

	filename = "'${NEWFILE}'"
	f = open(filename, "w")
	f.write(data["compiledCode"])

	print "\nBuild file %s created.\n" % filename
' $@