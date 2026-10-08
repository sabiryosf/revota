# Privora Web Full Test v0.3

## What is included
- Privora ID / contacts
- real-time messages through a WebSocket relay
- local browser message cache
- image/video/audio/file attachments (demo, max 8 MB)
- online/offline presence
- typing indicator
- voice call with WebRTC
- video call with WebRTC
- camera/microphone permissions
- responsive mobile UI
- local data clearing
- security status screen

## Test on one computer
1. Install Node.js 20+.
2. Open a terminal in this folder.
3. Run:
   npm install
   npm start
4. Open http://localhost:8787 in Chrome.
5. Open the same URL in a second tab/browser.
6. Set ID `alice` in one and `bob` in the other.
7. Add the other ID as a contact.
8. Because both are using the same server, they will appear online.
9. Send messages and test calls.

## Test on two phones on the same Wi-Fi
1. Start the server on a computer.
2. Find the computer's LAN IP, for example 192.168.1.20.
3. On both phones open:
   http://192.168.1.20:8787
4. Set different IDs and add each other.
5. For calls, allow microphone/camera permissions.

## Test from anywhere online
Deploy this folder to a Node hosting provider that supports WebSockets.
The service must run `npm start` and expose its assigned HTTPS URL.
Then open that URL on both phones. Use the same URL for both users.

For a secure production deployment use HTTPS/WSS. Do not expose an unencrypted ws:// relay over the public internet.

## IMPORTANT SECURITY
This is a feature-complete TEST SANDBOX, not a production-secure messenger.
It does NOT yet implement audited Signal-family E2EE, secure identity verification, encrypted attachment protocol, secure key lifecycle, or hardened production WebRTC signaling.
Do not use it for real secrets.

The architecture intentionally keeps the relay simple and content-blind, but the browser client currently sends demo message/file payloads through the relay.
