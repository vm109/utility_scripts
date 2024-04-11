export class StoryApi {
    private bearerToken: string;
    private host: string;

    constructor(bearerToken: string, host: string) {
        this.bearerToken = bearerToken;
        this.host = host;
    }

    public async getRevision(document_id: string, revision_id: string): Promise<any> {
        // Make API request using bearer token, host, document_id, and revision_id
        try {
            const url = `${this.host}/story/v2/story/${document_id}/revision/${revision_id}`;
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${this.bearerToken}`,
                },
            });
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error calling external API:', error);
            throw error;
        }
    }    
}