export function extractId(obj: any): number | string | undefined {
  if (!obj) return undefined;
  return obj.id ?? obj.drugId ?? obj.patientId ?? obj.DrugID ?? obj.PatientID;
}
