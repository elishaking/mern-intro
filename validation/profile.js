
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports.validateProfileInput = (data) => {
  let errors = {};

  data.handle = isEmpty(data.handle) ? '' : data.handle;
  data.status = isEmpty(data.status) ? '' : data.status;
  data.skills = isEmpty(data.skills) ? '' : data.skills;

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle must be between 2 and 40 characters';
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status field is required';
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required';
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports.validateExperienceInput = (data) => {
  let errors = {};

  data.title = isEmpty(data.title) ? '' : data.title;
  data.company = isEmpty(data.company) ? '' : data.company;
  data.from = isEmpty(data.from) ? '' : data.from;
  data.to = isEmpty(data.to) ? '' : data.to;
  data.current = isEmpty(data.current) ? 'false' : data.current;

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }

  if (data.current == 'false' && Validator.isEmpty(data.to)) {
    errors.to = 'To date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports.validateEducationInput = (data) => {
  let errors = {};

  data.school = isEmpty(data.school) ? '' : data.school;
  data.degree = isEmpty(data.degree) ? '' : data.degree;
  data.fieldofstudy = isEmpty(data.fieldofstudy) ? '' : data.fieldofstudy;
  data.to = isEmpty(data.to) ? '' : data.to;
  data.current = isEmpty(data.current) ? 'false' : data.current;

  if (Validator.isEmpty(data.school)) {
    errors.school = 'School field is required';
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required';
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'Field of study field is required';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }

  if (data.current == 'false' && Validator.isEmpty(data.to)) {
    errors.to = 'To date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
