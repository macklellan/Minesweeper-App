from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/play", methods=['GET', 'POST'])
def play():
    return render_template("play.html")

@app.route("/leaderboards", methods=['GET', 'POST'])
def leaderboards():
    return render_template("leaderboards.html")

if __name__ == "__main__":
    app.run(debug=True)