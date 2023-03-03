export function formatError(e) {
  return {
    type: e.name,
    errors: [
      {
        message: e.message,
      },
    ],
  };
}
