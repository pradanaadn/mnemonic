# Mnemonic

A note-taking application built with TypeScript, Express.js, and PostgreSQL.

## Features

- **User Management**: User authentication with role-based access control
- **Note Management**: Create, read, update, and delete notes with visibility controls (public/private)
- **Tagging System**: Organize notes with tags for better categorization
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Development Tools**: Pre-configured with ESLint, Prettier, Husky, and automated releases

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Development**: Docker Compose for local development
- **Code Quality**: ESLint, Prettier, Husky for git hooks
- **CI/CD**: GitHub Actions for automated releases with semantic-release

## Database Schema

The application uses the following main entities:

- **Users**: User accounts with role-based permissions
- **Roles**: User roles and permissions
- **Notes**: User notes with visibility controls
- **Tags**: Note categorization system
- **NoteTags**: Many-to-many relationship between notes and tags

## Prerequisites

- Node.js (v20 or higher)
- Docker and Docker Compose
- npm

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd mnemonic
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment setup

Copy the sample environment file and configure your settings:

```bash
cp .sample.env .env
```

Edit the [.env](.env) file with your preferred database credentials:

```env
POSTGRES_DB=mnemonic_db
POSTGRES_USER=mnemonic_user
POSTGRES_PASSWORD=secure_password
PGADMIN_DEFAULT_EMAIL=admin@mnemonic.com
PGADMIN_DEFAULT_PASSWORD=admin_password
```

### 4. Start the database

Using Docker Compose:

```bash
npm run docker-up
# or
make up
```

This will start:

- PostgreSQL database on port 5432
- pgAdmin on port 5433 (accessible at <http://localhost:5433>)

### 5. Database Management

The pgAdmin interface is automatically configured to connect to your PostgreSQL instance. Access it at:

- URL: <http://localhost:5433>
- Email: (from your .env file)
- Password: (from your .env file)

## Available Scripts

### Development

- `npm run docker-up` - Start database services
- `npm run docker-down` - Stop database services
- `npm run docker-logs` - View container logs
- `npm run docker-restart` - Restart database services

### Database

- `make up` - Start services using Makefile
- `make down` - Stop services using Makefile
- `make restart` - Restart services using Makefile

### Code Quality

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically

### Versioning

- `npm run version:patch` - Bump patch version
- `npm run version:minor` - Bump minor version
- `npm run version:major` - Bump major version
- `npm run semantic-release` - Run semantic release

## Project Structure

```text
src/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── db/             # Database schema and models
│   ├── Users.ts    # User model and relations
│   ├── Roles.ts    # Role model
│   ├── Notes.ts    # Note model and relations
│   ├── Tags.ts     # Tag model
│   ├── NoteTags.ts # Note-tag junction table
│   └── VisibilityEnum.ts # Note visibility enum
├── routes/         # API routes
├── services/       # Business logic services
└── index.ts        # Application entry point
```

## Database Schema Details

### Users Table

- User authentication and profile information
- Linked to roles for permission management
- Indexed on username and role combinations

### Notes Table

- User-created notes with title and content
- Visibility controls (public/private)
- Indexed for efficient querying by user, date, and title

### Tags System

- Flexible tagging system for note organization
- Many-to-many relationship with notes via NoteTags junction table

## Development Workflow

This project uses conventional commits and automated releases:

1. **Commit Format**: Follow conventional commit format (enforced by commitlint)

   ```bash
   feat: add new note creation endpoint
   fix: resolve user authentication issue
   docs: update API documentation
   ```

2. **Git Hooks**: Husky automatically runs:
   - Lint-staged on pre-commit (linting and formatting)
   - Commitlint on commit-msg (commit message validation)

3. **Automated Releases**: GitHub Actions automatically creates releases based on conventional commits

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commit format
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Docker Services

The [docker-compose.yaml](docker-compose.yaml) includes:

- **PostgreSQL**: Main database service
- **pgAdmin**: Database administration interface with auto-configuration

Both services are connected via a custom bridge network for secure communication.
