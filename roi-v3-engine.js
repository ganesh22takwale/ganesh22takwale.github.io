function calculateROIv3(inputs){

  const annualFailureRisk =
    inputs.failureCost *
    inputs.failureHours *
    inputs.eventsPerYear;

  const architecturePrevention = annualFailureRisk * 0.45;

  const trustMultiplier = architecturePrevention * 0.25;

  const totalROI = architecturePrevention + trustMultiplier;

  return {
    risk: annualFailureRisk,
    prevention: architecturePrevention,
    trustValue: trustMultiplier,
    totalROI: totalROI
  };

}

