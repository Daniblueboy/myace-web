import { fetchAPI } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, FileSpreadsheet, FileImage, File, Sparkles } from 'lucide-react';
import { SearchInput } from '@/components/ui/search-input';
import { EstateFilter } from '@/components/resources/EstateFilter';
import { Pagination } from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

const ITEMS_PER_PAGE = 9;

const fileTypeIcons: Record<string, any> = {
  PDF: FileText,
  XLS: FileSpreadsheet,
  XLSX: FileSpreadsheet,
  PNG: FileImage,
  JPG: FileImage,
  JPEG: FileImage,
};

function getFileIcon(fileType: string) {
  const Icon = fileTypeIcons[fileType?.toUpperCase()] || File;
  return Icon;
}

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: { search?: string; estateId?: string; page?: string };
}) {
  const { search, estateId, page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || '1', 10));

  const [resourcesData, estatesData] = await Promise.all([
    fetchAPI(`/resources?search=${encodeURIComponent(search || '')}&estateId=${encodeURIComponent(estateId || '')}`).catch(() => []),
    fetchAPI('/estates').then(res => res.items || res).catch(() => []),
  ]);

  const allResources = Array.isArray(resourcesData) ? resourcesData : [];
  const estates = Array.isArray(estatesData) ? estatesData : [];
  
  // Paginate
  const totalItems = allResources.length;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const resources = allResources.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 border-b">
        <div className="container mx-auto px-4 py-16 md:py-20 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Essential Documents & Guides
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Resources & Downloads
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Access brochures, payment plans, and investment guides for your real estate journey.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-lg border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-row gap-4 items-center max-w-xl mx-auto">
            <div className="flex-1">
              <Suspense fallback={null}>
                <SearchInput placeholder="Search resources..." />
              </Suspense>
            </div>
            <Suspense fallback={null}>
              <EstateFilter estates={estates} />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        {allResources.length === 0 ? (
          <div className="text-center py-24 max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, totalItems)}</span> of <span className="font-semibold text-foreground">{totalItems}</span> resources
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource: any, index: number) => {
                const FileIcon = getFileIcon(resource.fileType);
                
                return (
                  <Card
                    key={resource.id || index}
                    className="group flex flex-col overflow-hidden border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <FileIcon className="w-5 h-5" />
                        </div>
                        <Badge variant="secondary" className="font-mono text-xs">
                          {resource.fileType || 'PDF'}
                        </Badge>
                      </div>
                      <CardTitle className="mt-4 text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {resource.title}
                      </CardTitle>
                      {resource.estate && (
                        <CardDescription className="flex items-center gap-1.5 mt-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                          {resource.estate.name}
                        </CardDescription>
                      )}
                    </CardHeader>
                    
                    <CardContent className="grow pb-4">
                      <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                        {resource.description || 'Download this document for detailed information.'}
                      </p>
                    </CardContent>
                    
                    <CardFooter className="pt-0">
                      <Button className="w-full gap-2" asChild>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4" />
                          Download
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>

            {/* Pagination */}
            <Suspense fallback={null}>
              <Pagination
                totalItems={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
              />
            </Suspense>
          </>
        )}
      </div>
    </div>
  );
}
