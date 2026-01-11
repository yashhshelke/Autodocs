"""
Simple HTTP server to serve the AutoDocs static files
Run this file with: python server.py
Then open http://localhost:8000 in your browser
"""

import http.server
import socketserver
import os
from urllib.parse import unquote

PORT = 8000
DIRECTORY = "static"

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add CORS headers and proper content types
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()
    
    def do_GET(self):
        # Handle routing for single-page-like behavior
        path = unquote(self.path)
        
        # Route HTML pages
        if path == '/':
            self.path = '/index.html'
        elif path == '/auth':
            self.path = '/auth.html'
        elif path == '/dashboard':
            self.path = '/dashboard.html'
        elif path == '/workspace':
            self.path = '/workspace.html'
        
        return super().do_GET()

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print("=" * 60)
        print()
        print("         AutoDocs Development Server")
        print()
        print("=" * 60)
        print()
        print(f"  Server running at: http://localhost:{PORT}")
        print()
        print("  Available pages:")
        print(f"    * Landing Page:  http://localhost:{PORT}/")
        print(f"    * Auth Portal:   http://localhost:{PORT}/auth")
        print(f"    * Dashboard:     http://localhost:{PORT}/dashboard")
        print(f"    * Workspace:     http://localhost:{PORT}/workspace")
        print()
        print("  Press Ctrl+C to stop the server")
        print()
        print("=" * 60)
        print()
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\nServer stopped.")
