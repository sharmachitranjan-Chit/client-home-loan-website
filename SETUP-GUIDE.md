# NOVICE SETUP GUIDE — GITHUB + CLOUDFLARE PAGES

## Part 1 — Edit the website before uploading

1. Extract the ZIP file.
2. Open the folder `home-loan-dsa-starter`.
3. Open `assets/js/config.js` in any text editor.
4. Replace the sample business name, phone, WhatsApp number, email, city/service area and website URL.
5. The WhatsApp number must contain country code and digits only. Example: `919876543210`.
6. Search the whole folder for `example.com`, `99999`, `HomeLoan Assist` and `hello@example.com`; replace every remaining placeholder.
7. Update `privacy.html` and `terms.html` with the client’s real legal details.
8. Open `index.html` in Chrome and test the page.
9. Test on a phone and computer before publishing.

## Part 2 — Create a GitHub repository using only the website/app

1. Sign in to GitHub.
2. Tap the `+` button and choose `New repository`.
3. Repository name example: `client-home-loan-website`.
4. Choose `Private` while testing, or `Public` if acceptable.
5. Do not initialise with README because this package already contains one.
6. Tap `Create repository`.
7. On the empty repository page choose `uploading an existing file`.
8. Upload the CONTENTS of the extracted folder, not an extra outer folder.
9. Confirm that `index.html` is visible at the repository root.
10. In the commit box type `Initial website`.
11. Tap `Commit changes`.

For later updates:
1. Open the file in GitHub.
2. Tap the pencil/edit icon.
3. Make the change.
4. Tap `Commit changes`.
Cloudflare will automatically redeploy after every commit.

## Part 3 — Deploy on Cloudflare Pages

1. Create/sign in to a Cloudflare account.
2. Open `Workers & Pages`.
3. Choose `Create application`, then `Pages`, then connect/import an existing Git repository.
4. Authorise Cloudflare to access GitHub.
5. Select the new repository.
6. Use these settings:
   - Production branch: `main`
   - Framework preset: `None`
   - Build command: leave blank
   - Build output directory: `/`
7. Start the deployment.
8. Cloudflare will create a temporary address similar to `project-name.pages.dev`.
9. Open that address and test every section.

Important: choose Git integration from the beginning. Cloudflare's current documentation says a Git-integrated Pages project cannot later be switched to Direct Upload.

## Part 4 — Connect a custom domain

### When the domain already uses Cloudflare DNS
1. Open Cloudflare dashboard.
2. Open `Workers & Pages`.
3. Select the Pages project.
4. Open `Custom domains`.
5. Choose `Set up a domain`.
6. Enter `www.yourdomain.com`.
7. Follow the displayed DNS confirmation.
8. Repeat for the root domain `yourdomain.com` if required.
9. Keep one version as primary and redirect the other if desired.

### When the domain is registered elsewhere
1. Add the domain to Cloudflare.
2. Cloudflare will show two nameservers.
3. Sign in to the domain registrar.
4. Replace the registrar's existing nameservers with Cloudflare's nameservers.
5. Wait until Cloudflare marks the domain active.
6. Return to the Pages project's `Custom domains` section and add the domain.

SSL/HTTPS is normally issued automatically after DNS is correct.

## Part 5 — Final SEO edits

1. Put the exact live URL in the canonical and Open Graph URL inside `index.html`.
2. Replace every `example.com` entry in `robots.txt` and `sitemap.xml`.
3. Add the website to Google Search Console.
4. Verify ownership using the DNS method.
5. Submit: `https://yourdomain.com/sitemap.xml`.
6. Create a genuine Google Business Profile only when the business is eligible and has verifiable details.
7. Use original service-area pages and educational articles; do not copy bank content.

## Part 6 — Lead management

The included form opens a pre-filled WhatsApp message. It intentionally avoids collecting documents or storing data on the server.

Recommended first workflow:
1. Customer submits basic details.
2. DSA verifies identity by telephone.
3. DSA sends the official document checklist.
4. Documents are shared only through a secure, verified channel.
5. DSA maintains consent and case records.

For database storage, email automation, CRM integration or document uploads, add a secure backend only after defining privacy, access control, retention and compliance requirements.

## Part 7 — Pre-launch compliance checklist

- Display the real legal/business name.
- State clearly that the business is not a bank and does not guarantee approval.
- Display only lenders/products for which the DSA is actually authorised.
- Do not falsely claim “RBI approved” or “RBI registered”.
- Disclose customer-payable fees, if any, before engagement.
- Add a grievance contact and business address.
- Obtain consent before sharing data with a lender.
- Never ask for passwords, PINs or OTPs.
- Obtain professional legal/compliance review for the final client deployment.
