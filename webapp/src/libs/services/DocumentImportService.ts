// Copyright (c) Microsoft. All rights reserved.

import { IChatMessage } from '../models/ChatMessage';
import { BaseService } from './BaseService';

export class DocumentImportService extends BaseService {
    public importDocumentAsync = async (
        chatId: string,
        documents: File[],
        accessToken: string,
    ) => {
        const formData = new FormData();
        formData.append('chatId', chatId);
        formData.append('documentScope', 'Chat');
        for (const document of documents) {
            formData.append('formFiles', document);
        }

        // TODO: removed user name, in addition to user id. Does that need to be changed on the receiving end too?

        return await this.getResponseAsync<IChatMessage>(
            {
                commandPath: 'importDocuments',
                method: 'POST',
                body: formData,
            },
            accessToken,
        );
    };
}
