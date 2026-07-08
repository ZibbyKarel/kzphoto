import "@testing-library/jest-dom/vitest";

// Test double for the public Web3Forms key so useContactForm's happy-path
// (fetch called with the right payload) can be exercised without real env
// config. The value is never sent to a real network in tests (fetch is
// mocked per-test).
process.env.NEXT_PUBLIC_WEB3FORMS_KEY ??= "test-web3forms-key";
