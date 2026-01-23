import { test, expect, request, APIRequestContext } from '@playwright/test';
import { TEST_ADMIN_CREDENTIALS } from '../helpers/common/auth';
import { DrugsService } from '../helpers/services/drugs.service';
import { extractId } from '../helpers/utils/extract-id';


const baseUrl = 'http://localhost:3001/';

const drugData = {
  name: 'TestDrug_API',
  description: 'Test drug description',
  dosage: '10mg',
};

test.describe('API: Admin drug management', () => {
  let apiContext: APIRequestContext;
  let service: DrugsService;
  let drugId: number | string | undefined;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext();
    service = new DrugsService(apiContext, baseUrl);
  });

  test('add, check, and remove drug', async () => {
    // Add drug
    const addResponse = await service.addDrug(drugData, {
      username: TEST_ADMIN_CREDENTIALS.username,
      password: TEST_ADMIN_CREDENTIALS.password,
    });
    // Get the created object from the add response (may not include id) and assert details
    const created = await service.jsonOrThrow(addResponse);
    expect(created).toBeTruthy();

    // Prefer id from created response, but fall back to searching the list for a matching record
    drugId = extractId(created);
    let source = created as any;
    if (!drugId) {
      const getAll = await service.getAllDrugs({
        username: TEST_ADMIN_CREDENTIALS.username,
        password: TEST_ADMIN_CREDENTIALS.password,
      });
      const all = await service.jsonOrThrow(getAll);
      const found = all.find((d: any) =>
        (d.name || d.Name) === drugData.name &&
        (d.description || d.Description) === drugData.description &&
        (d.dosage || d.Dosage) === drugData.dosage
      );
      expect(found).toBeTruthy();
      source = found;
      drugId = extractId(found);
    }
    expect(drugId).toBeTruthy();

    // Validate details from the created or found resource
    expect(source.name || source.Name).toBe(drugData.name);
    expect(source.description || source.Description).toBe(drugData.description);
    expect(source.dosage || source.Dosage).toBe(drugData.dosage);

    // Remove drug
    const delResponse = await service.deleteDrug(drugId!, {
      username: TEST_ADMIN_CREDENTIALS.username,
      password: TEST_ADMIN_CREDENTIALS.password,
    });
    expect(delResponse.ok()).toBeTruthy();

    // Verify deletion by attempting to GET the deleted drug
    const getAfterDelete = await service.getDrug(drugId!, {
      username: TEST_ADMIN_CREDENTIALS.username,
      password: TEST_ADMIN_CREDENTIALS.password,
    });
    // Expect the resource to be gone (non-ok, e.g., 404)
    expect(getAfterDelete.ok()).toBeFalsy();



  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });
});
