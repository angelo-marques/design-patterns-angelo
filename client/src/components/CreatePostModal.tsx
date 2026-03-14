import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const PATTERNS = ["Singleton", "Factory Method", "Abstract Factory", "Builder", "Adapter", "Decorator", "Facade", "Observer", "Strategy"];
const LANGUAGES = ["java", "csharp", "python", "ruby"];

interface CreatePostModalProps {
  onPostCreated?: () => void;
}

export default function CreatePostModal({ onPostCreated }: CreatePostModalProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [language, setLanguage] = useState("");
  const [patternId, setPatternId] = useState("");
  const [tags, setTags] = useState("");

  const createPost = trpc.community.createPost.useMutation({
    onSuccess: () => {
      toast.success("Post criado com sucesso!");
      setTitle("");
      setContent("");
      setCodeSnippet("");
      setLanguage("");
      setPatternId("");
      setTags("");
      setOpen(false);
      onPostCreated?.();
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao criar post");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error("Título e conteúdo são obrigatórios");
      return;
    }

    createPost.mutate({
      title,
      content,
      patternId: patternId || undefined,
      codeSnippet: codeSnippet || undefined,
      language: language || undefined,
      tags: tags || undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Post
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Novo Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Padrão (opcional)</label>
            <Select value={patternId} onValueChange={setPatternId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um padrão" />
              </SelectTrigger>
              <SelectContent>
                {PATTERNS.map((pattern) => (
                  <SelectItem key={pattern} value={pattern}>
                    {pattern}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Título</label>
            <Input
              placeholder="Título do seu post"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Conteúdo</label>
            <Textarea
              placeholder="Descreva sua experiência ou pergunta sobre o padrão..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Linguagem (opcional)</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione linguagem" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang === "csharp" ? "C#" : lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Tags (opcional)</label>
              <Input
                placeholder="tag1, tag2, tag3"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Código (opcional)</label>
            <Textarea
              placeholder="Cole seu exemplo de código aqui..."
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              rows={4}
              className="font-mono text-sm"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={createPost.isPending}>
              {createPost.isPending ? "Criando..." : "Criar Post"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
