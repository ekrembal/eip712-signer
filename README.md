# EIP-712 Signer

A React application for signing EIP-712 typed data using Web3 wallets.

## Features

- Connect Web3 wallets via RainbowKit
- Sign EIP-712 typed data messages
- Edit domain, types, and message data
- Support for multiple blockchain networks
- Modern, responsive UI with Tailwind CSS

## Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

#### Standard Build
```bash
npm run build
```

#### Single File Build
```bash
npm run build:single
```

The single file build creates a self-contained `dist/index.html` file (~4.8MB) that includes all JavaScript, CSS, and assets inlined. This is perfect for:

- Sharing the application as a single file
- Deploying to static file hosting
- Offline usage
- Embedding in other applications

## Deployment

### GitHub Pages

The project includes a GitHub Action workflow that automatically deploys the single file build to GitHub Pages when you push to the `main` branch.

**Setup:**
1. Enable GitHub Pages in your repository settings
2. Set the source to "GitHub Actions"
3. Push to the `main` branch to trigger deployment

The workflow will:
- Build the single file version
- Deploy it to GitHub Pages
- Make it available at `https://yourusername.github.io/your-repo-name`

**Manual deployment:**
You can also trigger the deployment manually from the Actions tab in your GitHub repository.

## Configuration

The application is configured to work with multiple blockchain networks including:
- Citrea Testnet
- Ethereum Mainnet
- Polygon
- Optimism
- Arbitrum
- Base

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **RainbowKit** - Wallet connection UI
- **Wagmi** - React hooks for Ethereum
- **Viem** - Ethereum library
- **vite-plugin-singlefile** - Single file build support

## Project Structure

```
src/
├── main.tsx              # Application entry point
├── App.tsx               # Main application component
├── index.css             # Global styles
└── providers/
    └── RainbowKitProvider.tsx  # Web3 provider setup
```

## License

MIT