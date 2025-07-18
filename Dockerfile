# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the backend and frontend directories to the container
COPY project/backend /app
COPY project/frontend /app/static

# Install any needed packages specified in requirements.txt
RUN pip install Flask Pillow

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]
