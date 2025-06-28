# 🎂 Birthday Celebration App for Kahish

A beautiful, interactive birthday celebration web application with multiple interactive features including a balloon popping game, photo gallery, personalized birthday messages, and more!

![Birthday App](public/images/1.jpeg)

## 🌟 Features

- **Interactive Home Page**: Welcoming landing page with navigation to various birthday surprises
- **Balloon Popping Game**: Fun interactive game where you pop balloons to reveal surprises and animations
- **Photo Gallery**: Beautiful gallery of shared memories with fullscreen viewing
- **Birthday Messages**: Collection of heartfelt birthday wishes and messages
- **Memory Lane**: Timeline of special memories and moments
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop devices

## 🚀 Technologies Used

This project is built with modern web technologies:

- **React**: Frontend library for building the user interface
- **TypeScript**: For type-safe code and better developer experience
- **Vite**: Fast, modern build tool and development server
- **Framer Motion**: For smooth animations and transitions
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: UI component library for beautiful, accessible components
- **React Router DOM**: For navigation between different pages

## 🛠️ Local Development

### Prerequisites

- Node.js (v16+)
- npm or bun package manager

### Installation

```sh
# Clone the repository
git clone https://github.com/yourusername/birthday-celebration-app.git

# Navigate to the project directory
cd birthday-celebration-app

# Install dependencies
npm install
# or if using bun
bun install

# Start the development server
npm run dev
# or with bun
bun dev
```

The app will be available at `http://localhost:5173/`

## 🚢 Deployment

### Deploying to Vercel

1. **Create a Vercel Account**: Sign up at [vercel.com](https://vercel.com) if you don't have an account.

2. **Install Vercel CLI**:
   ```sh
   npm install -g vercel
   ```

3. **Login to Vercel**:
   ```sh
   vercel login
   ```

4. **Deploy the Project**:
   ```sh
   # From the project root directory
   vercel --prod
   ```

5. **Follow the Prompts**: Complete the setup process in your terminal.

### Ensuring Images Deploy Correctly

All images in the `public/images` folder will be automatically deployed with your project. The image paths you're using like `/images/1.jpeg` will work correctly on Vercel.

## 📱 Optimized for All Devices

- **Mobile-friendly**: Responsive design that works great on smartphones
- **Tablet-optimized**: Perfect for mid-size screens
- **Desktop-enhanced**: Takes advantage of larger screen real estate

## 🎮 How to Play the Balloon Game

1. Navigate to the Game page
2. Click or tap on balloons as they float up
3. Watch for special effects on milestone achievements
4. Try to pop as many balloons as possible!

## 💝 Personalized Content

Feel free to customize the content by:
- Adding more photos to the `public/images` folder
- Editing messages in the `Messages.tsx` component
- Adding new memories to the memories page

## 🙏 Acknowledgements

Special thanks to the open source community for the amazing libraries and tools that made this project possible.
