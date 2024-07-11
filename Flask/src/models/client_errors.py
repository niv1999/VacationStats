# Base class for any client error:
class ClientError(Exception):

    def __init__(self, message):
        super().__init__(message)
        self.message = message

# Resource not found error:
class ResourceNotFoundError(ClientError):

    def __init__(self, id):
        super().__init__(f"ID #{id} not found.")
        self.id = id

# Validation error:
class ValidationError(ClientError):

    def __init__(self, message, model):
        super().__init__(message)
        self.model = model
        
# Auth error:
class AuthError(ClientError):

    def __init__(self, message, model = None):
        super().__init__(message)
        self.model = model