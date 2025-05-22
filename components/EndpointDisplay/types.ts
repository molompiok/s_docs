import { ParameterDefinition } from "./ParametersTable";
import { ResponseDefinition } from "./ResponseDisplay";
export { ResponseDefinition } from "./ResponseDisplay";

export interface EndpointData {
    title: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    path: string;
    description?: string;
    security?: {
        type: string;
        description?: string;
        permissionsRequired?: string[]; //: Pour Bouncer
        abilitiesRequired?: string[]; //: Alternative/Complément pour Bouncer
    };
    notes?: (string | React.ReactNode)[];
    status: string,
    pathParameters?: ParameterDefinition[];      //
    queryParameters?: ParameterDefinition[];     //
    requestHeaders?: ParameterDefinition[];      //

    requestBody?: {
        contentType: string;
        description?: string;
        required?: boolean;
        schema?: {
            type: string;
            properties: Record<string, any>;
            required?: string[];
        };
        exampleJson?: string;
    };
    responses: ResponseDefinition[];
    codeExamples?: {
        language: string;
        title?: string;
        code: string;
    }[];
}
// export type ResponseDefinition = ResponseDefinition

interface Props {
    endpointData: EndpointData;
}
