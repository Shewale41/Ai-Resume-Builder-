# **AI Resume Builder**  
An AI-powered web application that helps users create professional, ATS-optimized resumes with:  
- **AI-generated content suggestions** (via Google Gemini)  
- **Real-time preview** and **one-click PDF export**  

---

## ** Features**  
- **Multi-Account Support:** Save unlimited resumes with user accounts  
- **PDF Export:** Download your resume with a single click  
- **Responsive Design:** Works seamlessly on all devices  

---

## ** Tech Stack**  
### **Frontend**  
- React 18 + Vite  
- Tailwind CSS + Shadcn/ui  
- react-to-pdf (PDF generation)  

### **Backend**  
- Strapi (Headless CMS)  
- PostgreSQL (Neon Serverless)  
- Google Gemini API  

### **DevOps**  
- Render (Backend Hosting)  
- Docker (Containerization)  

---

## ** Project Screenshots**  
Including screenshots in your README helps visualize the app.  
1. **Main Dashboard:**  
   ![Dashboard](./assets/dashboard.png)  

2. **Login page:**  
   ![Dashboard](./assets/login-page.png)  

3. **Create Resume:**  
   ![Resume Editor](./assets/create-resume.png)  

4. **AI Suggestions:**  
   ![AI Suggestions](./assets/ai-suggestions.png)  

4. **Theme Color:**  
   ![PDF Export](./assets/theme-Color.png)  



---

## ** Installation**  
### **Prerequisites**  
- Node.js v18+  
- PostgreSQL database  
- Google Gemini API key  

### **Local Setup**  
1. Clone the repo:  
   ```bash
   git clone https://github.com/yourusername/ai-resume-builder.git
   cd ai-resume-builder
   ```  
2. Frontend Setup:  
   ```bash
   cd frontend
   npm install
   cp .env.example .env.local
   npm run dev
   ```  
3. Backend Setup:  
   ```bash
   cd ../backend
   npm install
   cp .env.example .env
   npm run develop
   ```  

---

## ** Environment Variables**  
### **Frontend (.env.local)**  
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_GEMINI_API_KEY=your_google_ai_key
VITE_STRAPI_URL=http://localhost:1337
VITE_BASE_URL="http://localhost:5173"
```  

### **Backend (.env)**  
```env
DATABASE_URL=postgres://user:pass@host:port/db
GEMINI_API_KEY=your_google_ai_key
```  

---

## ** Deployment**  
### **Frontend (Vercel)**  
```bash
vercel deploy --prod
```  
### **Backend (Docker)**  
```bash
docker build -t resume-builder .
docker run -d -p 1337:1337 resume-builder
```  

---

## ** Contributing**  
1. Fork the repository  
2. Create a feature branch:  
   ```bash
   git checkout -b feature/your-feature
   ```  
3. Make changes and commit:  
   ```bash
   git commit -m "Added new feature"
   ```  
4. Push to the branch:  
   ```bash
   git push origin feature/your-feature
   ```  
5. Open a pull request  

---

## ** License**  
This project is licensed under the MIT License.  

---

##  Live Demos

**Frontend**: [View Live Frontend](https://ai-resume-builder-frontend-beta.vercel.app/)  
**Backend**: [View Backend API](https://ai-resume-builder-backend-ejnp.onrender.com)  

**API Test Endpoint**:  
`GET` https://ai-resume-builder-backend-ejnp.onrender.com/api/user-resumes