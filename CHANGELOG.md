# Changelog

All notable changes to HousingAlert will be documented in this file.

## [1.0.0] - 2026-03-08

### Added
- Initial release of HousingAlert MVP
- Email alert subscription system for 20 US counties
- Static waitlist status dashboard (manual updates)
- Clean monochrome UI following Infinite Machines design system
- Legal disclaimer and next steps for waitlist applicants
- Supabase integration for subscription storage (schema ready)
- Mobile-first responsive design with accessibility (WCAG 2.1 AA)

### Technical
- Next.js 16.1.6 + React 19.2.3
- Tailwind CSS 4 for styling
- Supabase client integration
- PORT 8080 binding for Railway deployment
- GitHub: doreisato/housingalert

### Counties Covered
Los Angeles CA, Cook IL, Harris TX, Maricopa AZ, San Diego CA, Orange CA, Miami-Dade FL, Kings NY, Dallas TX, Queens NY, Riverside CA, San Bernardino CA, Clark NV, Tarrant TX, Broward FL, Bexar TX, King WA, Wayne MI, Santa Clara CA, Bronx NY

### Pending
- Railway deployment (requires service reconfiguration from existing slot)
- Supabase schema deployment and environment variables
- Email alert system integration (Resend or EmailJS)
- Admin panel for manual status updates
