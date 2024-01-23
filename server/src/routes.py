from src import app, db

@app.route("/", methods=["GET"])
def hello():
    return "Hello World"