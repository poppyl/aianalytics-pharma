interface SystemPromptPreviewProps {
  content: string;
}

export const SystemPromptPreview = ({ content }: SystemPromptPreviewProps) => {
  return (
    <div className="bg-muted p-4 rounded-lg">
      <p className="text-xs font-medium text-muted-foreground mb-3">
        Preview: How the AI will see this prompt
      </p>
      <div className="bg-background p-4 rounded-md border">
        <pre className="text-sm whitespace-pre-wrap font-mono text-foreground">
          {content || "No system prompt configured yet..."}
        </pre>
      </div>
    </div>
  );
};
