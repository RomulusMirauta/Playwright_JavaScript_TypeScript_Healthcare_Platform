import { test, expect, request, APIRequestContext } from '@playwright/test';
import { TEST_ADMIN_CREDENTIALS } from '../helpers/common/auth';
import { PatientsService } from '../helpers/services/patients.service';
import { extractId } from '../helpers/utils/extract-id';


const baseUrl = 'http://localhost:3001/';

// Patient data matching backend's expected field names
const patientData = {
  firstName: 'Test',
  lastName: 'API',
  dob: '2025-10-14',
  gender: 'test',
  address: 'test',
};

test.describe('API: Admin patient management', () => {
  let apiContext: APIRequestContext;
  let service: PatientsService;
  let patientId: number | string | undefined;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext();
    service = new PatientsService(apiContext, baseUrl);
  });

  test('add, check, and remove patient', async () => {
    const addResponse = await service.addPatient(patientData, {
      username: TEST_ADMIN_CREDENTIALS.username,
      password: TEST_ADMIN_CREDENTIALS.password,
    });
    // Get the created object from the add response (may not include id) and assert details
    const created = await service.jsonOrThrow(addResponse);
    expect(created).toBeTruthy();

    // Prefer id from created response, but fall back to searching the list for a matching record
    patientId = extractId(created);
    let source = created as any;
    if (!patientId) {
      const getAll = await service.getAllPatients({
        username: TEST_ADMIN_CREDENTIALS.username,
        password: TEST_ADMIN_CREDENTIALS.password,
      });
      const all = await service.jsonOrThrow(getAll);
      const found = all.find((p: any) =>
        (p.firstName || p.FirstName) === patientData.firstName &&
        (p.lastName || p.LastName) === patientData.lastName
      );
      expect(found).toBeTruthy();
      source = found;
      patientId = extractId(found);
    }
    expect(patientId).toBeTruthy();

    // Validate details from the created or found resource
    expect(source.firstName || source.FirstName).toBe(patientData.firstName);
    expect(source.lastName || source.LastName).toBe(patientData.lastName);

    // Remove patient
    const delResponse = await service.deletePatient(patientId!, {
      username: TEST_ADMIN_CREDENTIALS.username,
      password: TEST_ADMIN_CREDENTIALS.password,
    });
    expect(delResponse.ok()).toBeTruthy();

    // Verify deletion by attempting to GET the deleted patient
    const getAfterDelete = await service.getPatient(patientId!, {
      username: TEST_ADMIN_CREDENTIALS.username,
      password: TEST_ADMIN_CREDENTIALS.password,
    });
    expect(getAfterDelete.ok()).toBeFalsy();
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });
});
