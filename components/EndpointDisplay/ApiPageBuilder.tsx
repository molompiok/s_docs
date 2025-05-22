// components/EndpointDisplay/ApiPageBuilder.tsx
import React, { ReactNode } from 'react';
import EndpointTitle from './EndpointTitle';
import Section from './Section';
import ParametersTable, { ParameterDefinition } from './ParametersTable';
import CodeSnippet from './CodeSnippet';
import ResponseDisplay, { ResponseDefinition } from './ResponseDisplay';
import SecurityInfo from './SecurityInfo';
import CodeExamplesTabs from './CodeExamplesTabs';
import Callout from './Callout';
import { EndpointData } from './types';


interface Props {
    endpointData: EndpointData;
}

const ApiPageBuilder: React.FC<Props> = ({ endpointData }) => {
    const requestBodyParams: ParameterDefinition[] =
        endpointData.requestBody?.schema?.properties
            ? Object.entries(endpointData.requestBody.schema.properties).map(([key, val]: [string, any]) => ({
                name: key,
                type: `${val.type}${val.format ? ` (${val.format})` : ''}`,
                required: endpointData.requestBody?.schema?.required?.includes(key),
                description: val.description,
                example: val.example,
            }))
            : [];

    return (
        <>
            <EndpointTitle
                method={endpointData.method}
                path={endpointData.path}
                title={endpointData.title}
                description={endpointData.description || ''}
            />

            {/* ... SecurityInfo, Notes ... */}
            {endpointData.security && (
                <SecurityInfo
                    type={endpointData.security.type}
                    description={endpointData.security.description}
                    permissionsRequired={endpointData.security.permissionsRequired}
                    abilitiesRequired={endpointData.security.abilitiesRequired}
                />
            )}

            {endpointData.notes && endpointData.notes.length > 0 && (
                <Section title="Important Notes" id="notes">
                    {endpointData.notes.map((note, index) => {
                        if (typeof note === 'string' || React.isValidElement(note)) {
                            return <Callout key={`note-${index}`} type="note">{note}</Callout>;
                        }
                        return <Callout key={`note-${index}`} type={/*note?.type||*/'note'} title={/*note?.title||*/''}>{/*note.content*/note}</Callout>;
                    })}
                </Section>
            )}

            {/* NOUVEAU: Path Parameters */}
            {endpointData.pathParameters && endpointData.pathParameters.length > 0 && (
                <Section title="Path Parameters" id="path-parameters">
                    <ParametersTable parameters={endpointData.pathParameters} />
                </Section>
            )}

            {/* NOUVEAU: Query Parameters */}
            {endpointData.queryParameters && endpointData.queryParameters.length > 0 && (
                <Section title="Query Parameters" id="query-parameters">
                    <ParametersTable parameters={endpointData.queryParameters} />
                </Section>
            )}

            {/* NOUVEAU: Request Headers */}
            {endpointData.requestHeaders && endpointData.requestHeaders.length > 0 && (
                <Section title="Request Headers" id="request-headers">
                    <ParametersTable parameters={endpointData.requestHeaders} />
                </Section>
            )}

            {/* Request Body (existant) */}
            {requestBodyParams.length > 0 && endpointData.requestBody && (
                <Section title="Request Body" id="request-body">
                    <p className="mb-2 text-sm">
                        Content Type: <code>{endpointData.requestBody.contentType}</code>
                        {endpointData.requestBody.required && <span className="ml-2 text-xs font-semibold text-red-500">(Required)</span>}
                    </p>
                    {endpointData.requestBody.description && (
                        <div className="prose prose-sm dark:prose-invert max-w-none mb-4">
                            {typeof endpointData.requestBody.description === 'string' ? <p>{endpointData.requestBody.description}</p> : endpointData.requestBody.description}
                        </div>
                    )}
                    <ParametersTable parameters={requestBodyParams} />
                    {endpointData.requestBody.exampleJson && (
                        <>
                            <h4 className="text-md font-semibold mt-6 mb-1 dark:text-slate-200">Example Body:</h4>
                            <CodeSnippet language="json" code={endpointData.requestBody.exampleJson} />
                        </>
                    )}
                </Section>
            )}

            {/* Responses (sera modifié pour afficher les headers de réponse) */}
            <Section title="Responses" id="responses">
                {endpointData.responses.map((response) => (
                    <ResponseDisplay key={response.statusCode} {...response} />
                ))}
            </Section>

            {endpointData.codeExamples && endpointData.codeExamples.length > 0 && (
                <Section title="Code Examples" id="code-examples">
                    <CodeExamplesTabs examples={endpointData.codeExamples} />
                </Section>
            )}
        </>
    );
};

export default ApiPageBuilder