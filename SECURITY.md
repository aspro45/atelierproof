# Security

AtelierProof is safe to publish as a public frontend and contract-source repository.

Do not commit:

- private keys
- vault files
- wallet JSON exports
- `.env` files
- `.vercel/`
- local dashboard state

The GenLayer contract treats all source pages, garment descriptions, supplier notes, objections and appeals as untrusted content. Prompt-injection defenses are included in the contract prompts.
