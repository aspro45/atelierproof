# AtelierProof

AtelierProof is a GenLayer Studionet project for fashion provenance: material claims, supplier proofs, workshop steps, objections, appeals and final public seals.

The project is intentionally styled like an atelier worktable instead of another dark dashboard. The frontend uses a textile canvas, pattern pieces, proof lanes and a ledger rail so it reads like a separate product team built it.

## Repository Contents

- `index.html` - static app shell
- `styles.css` - atelier worktable visual system
- `app.js` - interactive local preview with staged provenance records
- `contracts/atelierproof.py` - GenLayer intelligent contract source
- `deployment.json` - finalized Studionet deployment metadata and smoke transactions
- `config.js` - frontend contract configuration

## Contract Surface

Primary source: `contracts/atelierproof.py`

Core write methods:

- `register_piece`
- `add_material_proof`
- `add_process_step`
- `open_review`
- `review_piece_with_genlayer`
- `open_objection_window`
- `file_objection`
- `resolve_objection_with_genlayer`
- `file_appeal`
- `resolve_appeal_with_genlayer`
- `seal_piece`
- `archive_piece`
- `recalculate_reputation`

Core read methods:

- `get_piece`
- `get_recent_pieces`
- `get_material_proofs`
- `get_process_steps`
- `get_reviews`
- `get_objections`
- `get_appeals`
- `get_audit_log`
- `get_frontend_bootstrap`

## Local Preview

```powershell
npx serve . -l 8080
```

Open:

```text
http://localhost:8080/
```

## Studionet Deployment

- Contract: `0xAF3f80581817D41d7058Ca1eE63f8Ef1305FCd28`
- Explorer: https://explorer-studio.genlayer.com/contracts/0xAF3f80581817D41d7058Ca1eE63f8Ef1305FCd28
- Deploy tx: `0x1f12a210a349fa8aed70f8cec75f78c98ce2a6c5f5228ca8dffa1b88f2ca3af4`
- Faucet tx: `0x477a86ae4e25ddc7ffc25fa7cbd33c6ea4122ad5351dbab42f37bb24b42bdd34`
- Smoke: material proofs, process steps, GenLayer review, objection, appeal, seal and reputation writes finalized.
- Tests: `npx tsx scripts\test-atelierproof.ts` passed 17/17.

## Public Release

- Repository: <https://github.com/aspro45/atelierproof>
- Live app: <https://atelierproof.vercel.app>
- Runtime: static HTML/CSS/JavaScript
- Deployment metadata: `deployment.json`

## Security

Private keys, vault files, `.env`, `.vercel/`, local dashboard data and wallet JSON files must stay out of GitHub/Vercel. This repository contains only public frontend code, contract source and deployment metadata.
