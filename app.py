from flask import Flask,jsonify,render_template,request
import Flower as f

flowers_data = f.flowers


app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get", methods=["POST"])
def get_flower():

    data = request.json

    flower = data["f_name"].capitalize()

    for value in flowers_data.values():
        if value["name"] == flower:
            return jsonify({
                "status": "success",
                "flower": value
            })

    return jsonify({
        "status": "error",
        "message": "Flower not found"
    })
    
app.run(debug=True)