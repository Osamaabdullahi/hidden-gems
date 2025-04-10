# Hidden Gems - Discover Amazing Travel Destinations

![Hidden Gems Logo](public/og-image.jpg)

Hidden Gems is a modern travel discovery platform that helps users explore and save unique destinations around the world. Built with Next.js and powered by a robust backend API, it provides a seamless experience for travel enthusiasts to discover hidden travel spots.

## ✨ Features

- **Destination Discovery**: Browse through carefully curated travel destinations
- **Smart Categories**: Filter destinations by categories like Safari, Beach, Mountain, etc.
- **Personal Collections**: Save your favorite destinations for future reference
- **Rich Details**: Get comprehensive information about each destination including:
  - Best times to visit
  - Admission fees
  - Contact information
  - User ratings
  - Top features
  - Location details

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running (separate repository)

### Installation

1. Clone the repository:

```bash
git https://github.com/Osamaabdullahi/hidden-gems
cd hiddengems
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

## 🛠️ Built With

- [Next.js 14](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Zustand](https://github.com/pmndrs/zustand) - State Management
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide Icons](https://lucide.dev/) - Icons
- [Sonner](https://sonner.emilkowal.ski/) - Toast Notifications

## 📱 Screenshots

[Add screenshots of your application here]

## 🔒 Environment Variables

The following environment variables are required:

```env
NEXT_PUBLIC_BACKEND_URL=your_backend_api_url
```

## 📖 API Documentation

The application interacts with the following key endpoints:

- `GET /api/destinations` - Fetch all destinations
- `GET /api/destinations?category={category}` - Fetch destinations by category
- `GET /api/destinations/{id}` - Fetch single destination details
- `POST /api/login` - User authentication
- `POST /api/signup` - User registration

## 🚀 Deployment

This application is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import your repository to Vercel
3. Set up your environment variables
4. Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Design inspiration from Airbnb and Booking.com
- Icons from Lucide Icons
- Font family from Vercel (Geist)
