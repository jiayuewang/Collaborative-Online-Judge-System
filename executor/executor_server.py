import executor_utils as eu
import json
import sys

from flask import Flask
from flask import jsonify
from flask import request

app = Flask(__name__)

@app.route("/")
def hello():
	return 'hello from executor server, debug mode'

@app.route('/build_and_run', methods=['POST'])
def build_and_run():
	data = json.loads(request.data)
	if 'code' not in data or 'language' not in data:
		return "Should provide both 'code' and 'language'"
	code = data['code']
	language = data['language']
	print 'API go called with code %s in %s' % (code, language)

	result = eu.build_and_run(code, language)
	return jsonify(result)


if __name__ == '__main__':
	eu.load_image()
	port = int(sys.argv[1])
	app.run(port=port)