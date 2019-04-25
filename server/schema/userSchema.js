module.exports = {
    username: {
        isLength: {
            errorMessage: 'username should be at least 2 chars long',
            options: { min: 2 }
        },
        customSanitizer: {
            options: (value, { req, location, path }) => {
              let sanitizedValue;
              if (req.body.username) {
                sanitizedValue = toString(value).toLowerCase();
              }
              return sanitizedValue;
            }
          }
    }
}