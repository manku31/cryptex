# Cryptex

A modern, secure Web3 wallet generator for the Solana blockchain. Cryptex allows users to generate, manage, and view Solana wallets with an intuitive and beautiful user interface.

## About the Project

Cryptex is a personal Web3 wallet application built specifically for the Solana ecosystem. It provides a secure way to generate hierarchical deterministic (HD) wallets using industry-standard BIP39 mnemonic phrases and ED25519 key derivation. The application features a clean, modern interface with dark/light theme support and responsive design.

## Features

- Generate Solana wallets with BIP39 mnemonic phrases
- Hierarchical Deterministic (HD) wallet support
- Secure key derivation using ED25519
- View wallet details including public/private keys
- Dark/Light theme toggle
- Responsive design for all devices
- Modern UI with shadcn/ui components
- Toast notifications for better UX

## Tech Stack

### Frontend Framework

- **Next.js 16** - React framework with App Router
- **React 19** - JavaScript library for building user interfaces
- **TypeScript** - Type-safe development

### Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Reusable component library
- **Radix UI** - Accessible component primitives
- **lucide-react** - Icon library
- **next-themes** - Theme management

### Blockchain & Cryptography

- **@solana/web3.js** - Solana blockchain integration
- **bip39** - Mnemonic phrase generation
- **ed25519-hd-key** - HD key derivation
- **tweetnacl** - Cryptographic operations

### UI Components

- **Radix UI Alert Dialog** - Modal dialogs
- **Radix UI Switch** - Toggle switches
- **sonner** - Toast notifications

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v20 or higher)
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **Git** for version control

## Installation & Setup

Follow these steps to clone and run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/cryptex.git
cd cryptex
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

Using pnpm:

```bash
pnpm install
```

Using bun:

```bash
bun install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 4. Open in Browser

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Build for Production

To create an optimized production build:

```bash
npm run build
npm start
```

## Project Structure

```
cryptex/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── navbar/             # Navigation components
│   ├── ui/                 # shadcn/ui components
│   └── walletGenerator/    # Wallet generation components
├── lib/                     # Utility functions
├── public/                  # Static assets
├── package.json            # Project dependencies
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Security Considerations

- **Private Keys**: Never share your private keys or mnemonic phrases with anyone
- **Local Storage**: This application stores sensitive data locally. Use it only on trusted devices
- **Production Use**: This is a development/educational project. For production use, implement additional security measures
- **HTTPS**: Always use HTTPS in production to protect data in transit
- **Backup**: Always backup your mnemonic phrases securely offline

## Development

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

### Code Style

The project uses:

- TypeScript for type safety
- ESLint for code linting
- Tailwind CSS for styling

## Environment Variables

Currently, this project doesn't require environment variables. If you add external APIs or services, create a `.env.local` file:

```env
# Example
NEXT_PUBLIC_API_URL=your_api_url
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Solana integration via [@solana/web3.js](https://solana-labs.github.io/solana-web3.js/)

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Made with ❤️ for the Solana community
