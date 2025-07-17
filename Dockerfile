# Use a lightweight nginx image
FROM nginx:alpine

# Copy the static content into the nginx html directory
COPY . /usr/share/nginx/html

# Expose port 80 for nginx
EXPOSE 80
