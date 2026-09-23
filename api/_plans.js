/**
 * Single source of truth for Kestara plans, shared by the contact endpoint (email
 * routing + auto-reply) and the chat endpoint (assistant knowledge).
 * Files prefixed with "_" are not exposed as Vercel routes.
 *
 * Access is granted through GitHub (public repo, or an invite to the plan's
 * private-org team) — usage is not metered.
 */
module.exports = {
  free: {
    label: "Free",
    price: "$0",
    paid: false,
    includes: [
      "The public Kestara repository",
      "The full 12-phase AI-DLC workflow and every agent",
      "Community support through GitHub Issues"
    ]
  },
  starter: {
    label: "Starter",
    price: "$19/mo",
    paid: true,
    includes: [
      "Everything in Free",
      "Access to the private Pro Pack repository",
      "Starter theme and component library",
      "Extended Security, Performance and Deployment checklists"
    ]
  },
  pro: {
    label: "Professional",
    price: "$49/mo",
    paid: true,
    includes: [
      "Everything in Starter",
      "Access to the private Templates repository",
      "Industry templates (e-commerce, membership, LMS)",
      "CMS content-model presets",
      "Email support"
    ]
  },
  business: {
    label: "Business",
    price: "$149/mo",
    paid: true,
    includes: [
      "Everything in Professional",
      "All private repositories, up to 5 GitHub seats",
      "Early access to new releases",
      "Priority support"
    ]
  },
  enterprise: {
    label: "Enterprise",
    price: "Custom",
    paid: true,
    includes: [
      "Everything in Business",
      "Private fork and custom agent configuration",
      "Onboarding with the Kestara team"
    ]
  }
};
