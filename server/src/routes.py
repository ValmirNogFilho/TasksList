from src import app, db
from src.models import Task
from flask import jsonify, request


@app.route("/tasks", methods=["GET"])
def findManyTasks():
    all_tasks = Task.query.all()

    return jsonify(
        all_tasks
    ), 200


@app.route("/tasks", methods=["POST"])
def createNewTask():
    req = request.get_json()

    new_task: Task = Task(
        title=req["title"],
        description=req["description"],
        status=req["status"]
    )

    db.session.add(new_task)
    db.session.commit()

    return jsonify(
        new_task.as_dict()
    ), 201


@app.route("/tasks/<id>", methods=["PUT"])
def updateTask(id):
    task: Task = Task.query.filter_by(id=id).first()

    if not task:
        return jsonify(
            {
                "error": "Task not found"
            }
        ), 404
    
    updated_task_request = request.get_json()

    task.update(updated_task_request)

    db.session.commit()

    return jsonify(
        task.as_dict()
    ), 200


@app.route("/tasks/<id>", methods=["DELETE"])
def deleteTask(id):
    task: Task = Task.query.filter_by(id=id).first()

    if not task:
        return jsonify(
            {
                "error": "Task not found"
            }
        ), 404

    db.session.delete(task)

    return jsonify(
        {
            "message": "task has been deleted successfully"
        }
    ), 200