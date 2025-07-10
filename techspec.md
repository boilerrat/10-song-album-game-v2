## 10 Song Album Game (Farcaster Mini App)

### 1. Overview

**1.1 Project Description**

- Collaborative playlist creation game integrated within Farcaster's `/now-playing` channel.
    
- Users collectively build themed playlists of exactly 10 songs, one song per user per playlist (unless idle 24h).
    

**1.2 Platform**

- Farcaster Mini App (Embeds within Farcaster clients)
    

**1.3 Tech Stack**

- Frontend: Vite or Next.js (to be finalized)
    
- SDK: `@farcaster/miniapp-sdk`
    
- Data Storage: Decentralized option (IPFS) or self-hosted VPS (JSON or lightweight DB)
    
- Hosting: VPS for backend services, potentially Vercel or similar for frontend static deployment
    

---

### 2. Functional Specifications

**2.1 User Authentication**

- Utilize "Quick Auth" (SIWF - Sign-In with Farcaster) for seamless, cryptographic user authentication without OAuth.
    

**2.2 Game Mechanics**

- **Playlist Rules:**
    
    - Strict 10-track limit per album.
        
    - User song contribution limited to one per playlist, unless idle condition met.
        
    - Sequential numbering for playlists (e.g., Playlist #6).
        
- **Song Management:**
    
    - Validate song availability on major streaming platforms (YouTube preferred).
        
    - Avoid duplicates; verify against current and previous playlists for uniqueness.
        
- **Theme Management:**
    
    - Theme selected by user contributing the 10th track.
        
    - Explicit clarification mechanism for theme definitions (user responsibility).
        
- **Playlist Publishing:**
    
    - Capability to export or embed the finalized playlist onto streaming services.
        
    - Confirm availability of all tracks on chosen streaming platform prior to publishing.
        
- **Optional Enhancements:**
    
    - Integrated discussion space for users to share context about selections.
        
    - Artwork contribution for playlist covers.
        

---

### 3. Data Management and Storage

**3.1 Playlist Data Schema (Example)**

```json
{
  "playlistId": 6,
  "theme": "Songs That Should Be in a Movie",
  "createdTimestamp": "2025-07-08T00:00:00Z",
  "completedTimestamp": "2025-07-09T12:00:00Z",
  "songs": [
    {
      "trackNumber": 1,
      "artist": "Artist Name",
      "title": "Song Title",
      "url": "https://youtube.com/...",
      "addedBy": "UserFarcasterId",
      "timestamp": "2025-07-08T01:00:00Z"
    }
    // additional songs
  ],
  "coverArtUrl": "optional-cover-image.jpg"
}
```

**3.2 Storage Option**

- Primary: IPFS via JSON files for decentralized resilience and accessibility.
    
- Alternative: JSON flat-file hosted on self-managed VPS with regular backups for persistence and speed.
    

---

### 4. User Interface and Experience

**4.1 Layout**

- Standard vertical modal, optimized for mobile viewing (424x695px web standard).
    
- Splash screen with loading state managed by `sdk.actions.ready()`.
    

**4.2 Key Screens**

- **Playlist Overview:** Current playlist, track list, theme prominently displayed.
    
- **Add Song Modal:** Song entry form (Artist, Title, URL validation).
    
- **Theme Setting Interface:** Available only to user completing the playlist.
    

**4.3 User Interactions**

- Single-click song submission with duplication validation.
    
- Theme selection facilitated by UI prompt upon playlist completion.
    
- Interactive tooltips/guides for clarity on playlist rules.
    

---

### 5. Integration with Farcaster SDK

**5.1 Mini App SDK Usage**

- Actions:
    
    - `ready()` – Hide splash screen post-loading.
        
    - `signin()` – Authenticate users via Farcaster keys.
        
    - `composeCast()` – Allow easy casting to Farcaster about playlist updates.
        
    - `addMiniApp()` – Prompt users to add this Mini App to favorites.
        
    - `sendToken()`, `swapToken()` – (Optional/future token incentive integration).
        
- Context:
    
    - Retrieve user and cast data for personalized interaction.
        
- Wallet (optional future enhancement):
    
    - Ethereum wallet integration (`getEthereumProvider()`) for NFT or token-based enhancements.
        

---

### 6. Embed and Manifest Specifications

**6.1 Manifest (`/.well-known/farcaster.json`)**

- Hosted publicly, including:
    
    - App metadata (name, icon, home URL, image URL, splash details).
        
    - Ownership verification via cryptographic `accountAssociation`.
        
    - Optional webhook URL for notifications.
        

**6.2 Embed Meta Tags**

- Standardized embed metadata within HTML `<head>` for Farcaster integration:
    

```html
<meta name="fc:miniapp" content='{
  "version":"1",
  "imageUrl":"https://album-game.app/embed-image.png",
  "button":{
    "title":"Play Now",
    "action":{
      "type":"launch_frame",
      "name":"10 Song Album Game",
      "url":"https://album-game.app",
      "splashImageUrl":"https://album-game.app/icon.png",
      "splashBackgroundColor":"#f7f7f7"
    }
  }
}' />
```

---

### 7. Notifications and Webhooks

- Webhook system to handle notifications for significant game events:
    
    - Playlist completed.
        
    - New themes announced.
        
- Users can toggle notifications via Farcaster clients.
    

---

### 8. Performance and Security Considerations

- Ensure rapid loading (< 2 seconds).
    
- Implement data validation on both client and server.
    
- IPFS storage redundancy, fallback to centralized backup.
    
- Prevent abuse with basic rate limiting on song submissions.
    

---

### 9. Deployment and CI/CD Pipeline

- Frontend deployed via Vercel or similar static-hosting platform.
    
- Automated deployment pipeline (GitHub Actions recommended).
    
- Regular backups and sync to IPFS via automated scripts.
    

---

### 10. Future-Proofing and Scalability

- Modular architecture to support future enhancements (token incentives, NFTs).
    
- Structured JSON schema versioning to facilitate smooth data migrations.
    

---

### 11. Appendix / References

- [Farcaster Mini Apps – Getting Started Guide](https://miniapps.farcaster.xyz/docs/getting-started)
    
- [Farcaster Mini App SDK](https://github.com/farcasterxyz/miniapps)
    