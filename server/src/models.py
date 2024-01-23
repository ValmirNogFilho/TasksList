from src import db

class Task(db.Model):

    id: int = db.Column(db.Integer(), primary_key=True)
    title: str = db.Column(db.String(length=80), nullable=False)
    description: str = db.Column(db.String(length=500), nullable=False)
    status: str = db.Column(db.String(length=10), nullable=False)

    def __init__(self, title: str, description: str, status: str):
        self.title = title
        self.description = description
        self.status = status

    def as_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "status": self.status,
        }
    
    def update(self, updated_task_request: dict):
        self.title = updated_task_request["title"]
        self.description = updated_task_request["description"]
        self.status = updated_task_request["status"]
