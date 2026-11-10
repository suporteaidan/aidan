import { apiRequest } from '../client';
import { apiRoutes } from '../routes';
import type { NfeImportRequest, NfeImportResponse } from '../contracts';

/** Importação autenticada de NFC-e por URL pública do QR Code. */
export const nfeApi = {
  importFromQrCodeUrl(data: NfeImportRequest): Promise<NfeImportResponse> {
    return apiRequest<NfeImportResponse>(apiRoutes.importNfe, { method: 'POST', body: data });
  },
};
