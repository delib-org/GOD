export interface Image {
    asset_id: string;
    public_id: string;
    version: number;
    version_id: string;
    signature: string;
    widthuploadfile: number;
    heightuploadfile: number;
    formatuploadfile: string;
    resource_typeuploadfile: string;
    created_atuploadfile: string;
    tags: [];
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    access_mode: string;
    original_filename: string;
    original_extension: string;
}