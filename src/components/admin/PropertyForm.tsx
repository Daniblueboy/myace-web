'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { API_URL } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Property } from '@/shared';
import { useEffect, useState } from 'react';
import { useAdminModal } from '@/components/admin/AdminModalProvider';

// Simplified schema, ideally share with backend via Zod
const propertySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1),
  type: z.enum(['LAND', 'APARTMENT']),
  status: z.enum(['AVAILABLE', 'SOLD', 'UPCOMING']),
  price: z.coerce.number().min(0),
  currency: z.string().default('NGN'),
  state: z.string().min(1),
  city: z.string().min(1),
  address: z.string().min(1),
  estateId: z.string().min(1, 'Estate is required'),
  bedrooms: z.coerce.number().optional(),
  bathrooms: z.coerce.number().optional(),
  size: z.string().optional(),
});

interface PropertyFormProps {
  initialData?: Property;
  onSubmit: (values: any) => Promise<void>;
  loading?: boolean;
  estates?: Array<{ id: string; name: string }>;
}

interface VariantItem {
  label: string;
  price: number;
  currency: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  size?: string | null;
  sizeUnit?: string | null;
  paymentType?: string | null;
  upfrontPercent?: number | null;
  installmentMonths?: number | null;
  installmentAmount?: number | null;
  active?: boolean;
}

interface MediaItem {
  type: string;
  title?: string;
  url: string;
}

export function PropertyForm({ initialData, onSubmit, loading, estates = [] }: PropertyFormProps) {
  const form = useForm<any>({
    // @ts-ignore
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: '',
      description: '',
      type: 'APARTMENT',
      status: 'AVAILABLE',
      price: 0,
      currency: 'NGN',
      state: '',
      city: '',
      address: '',
      estateId: '',
      bedrooms: 0,
      bathrooms: 0,
      size: '',
    },
  });

  const [images, setImages] = useState<string[]>([]);
  const [variants, setVariants] = useState<VariantItem[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const { showAlert } = useAdminModal();

  async function uploadFile(file: File, folder: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    const res = await fetch(`${API_URL}/admin/uploads`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Upload failed');
    }
    return res.json();
  }

  async function handleImageUpload(files: FileList | File[]) {
    if (!files || files.length === 0) return;
    setUploadingImages(true);
    try {
      const uploads = await Promise.all(
        Array.from(files).map((file) => uploadFile(file, 'properties/images'))
      );
      setImages((prev) => [...prev, ...uploads.map((item) => item.url)]);
    } catch (err: any) {
      await showAlert({
        title: 'Failed to upload image',
        description: err.message,
      });
    } finally {
      setUploadingImages(false);
    }
  }

  async function handleMediaUpload(files: FileList | File[]) {
    if (!files || files.length === 0) return;
    setUploadingMedia(true);
    try {
      const fileArray = Array.from(files);
      const uploads = await Promise.all(
        fileArray.map((file) => uploadFile(file, 'properties/media'))
      );
      const items = uploads.map((upload, index) => ({
        type: fileArray[index].type.startsWith('video/') ? 'VIDEO' : 'FLYER',
        title: '',
        url: upload.url,
      }));
      setMedia((prev) => [...prev, ...items]);
    } catch (err: any) {
      await showAlert({
        title: 'Failed to upload media',
        description: err.message,
      });
    } finally {
      setUploadingMedia(false);
    }
  }

  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title,
        description: initialData.description,
        type: initialData.type as any,
        status: initialData.status as any,
        price: Number(initialData.price) || 0,
        currency: initialData.currency || 'NGN',
        state: initialData.state || '',
        city: initialData.city || '',
        address: initialData.address || '',
        estateId: initialData.estateId || '',
        bedrooms: Number(initialData.bedrooms) || 0,
        bathrooms: Number(initialData.bathrooms) || 0,
        size: initialData.size ? String(initialData.size) : '',
      });
      setImages(initialData.images?.map((img) => img.url) || []);
      setVariants(
        (initialData.variants || []).map((variant) => ({
          label: variant.label,
          price: Number(variant.price),
          currency: variant.currency || 'NGN',
          bedrooms: variant.bedrooms ?? null,
          bathrooms: variant.bathrooms ?? null,
          size: variant.size ?? null,
          sizeUnit: variant.sizeUnit ?? null,
          paymentType: variant.paymentType ?? 'OUTRIGHT',
          upfrontPercent: variant.upfrontPercent ?? null,
          installmentMonths: variant.installmentMonths ?? null,
          installmentAmount: variant.installmentAmount ?? null,
          active: variant.active ?? true,
        }))
      );
      setMedia(
        (initialData.media || []).map((item) => ({
          type: item.type,
          title: item.title || '',
          url: item.url,
        }))
      );
    }
  }, [initialData, form]);

  return (
    <Form {...form}>
    {/* @ts-ignore */}
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit({
            ...values,
            images: images.filter(Boolean),
            variants: variants.filter((v) => v.label && v.price),
            media: media.filter((m) => m.url && m.type),
          })
        )}
        className="space-y-8 max-w-2xl"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl><Input placeholder="E.g. Luxury 3 Bedroom Apartment" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="APARTMENT">Apartment</SelectItem>
                    <SelectItem value="LAND">Land</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="AVAILABLE">Available</SelectItem>
                    <SelectItem value="SOLD">Sold</SelectItem>
                    <SelectItem value="UPCOMING">Upcoming</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
           <FormField control={form.control} name="currency" render={({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
           )} />
           <FormField control={form.control} name="price" render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl><Input type="number" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
           )} />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl><Textarea placeholder="Property description..." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-4">
           <FormField control={form.control} name="bedrooms" render={({ field }) => (
              <FormItem>
                <FormLabel>Bedrooms</FormLabel>
                <FormControl><Input type="number" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
           )} />
           <FormField control={form.control} name="bathrooms" render={({ field}) => (
              <FormItem>
                <FormLabel>Bathrooms</FormLabel>
                <FormControl><Input type="number" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
           )} />
           <FormField control={form.control} name="size" render={({ field }) => (
              <FormItem>
                <FormLabel>Size (sqm)</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
           )} />
        </div>

        <div className="grid grid-cols-3 gap-4">
           <FormField control={form.control} name="state" render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
           )} />
           <FormField control={form.control} name="city" render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
           )} />
           <FormField control={form.control} name="address" render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
           )} />
        </div>

        <FormField
          control={form.control}
          name="estateId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estate *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select estate" /></SelectTrigger></FormControl>
                <SelectContent>
                  {estates.map((estate) => (
                    <SelectItem key={estate.id} value={estate.id}>
                      {estate.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Image URLs</h3>
            <div className="flex items-center gap-2">
              <label className="inline-flex items-center gap-2 text-sm font-medium">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={async (e) => {
                    if (!e.target.files || e.target.files.length === 0) return;
                    await handleImageUpload(e.target.files);
                    e.target.value = '';
                  }}
                />
                <Button type="button" variant="outline" disabled={uploadingImages}>
                  {uploadingImages ? 'Uploading...' : 'Upload Images'}
                </Button>
              </label>
              <Button
                type="button"
                variant="outline"
                onClick={() => setImages([...images, ''])}
              >
                Add URL
              </Button>
            </div>
          </div>
          <div
            className="border-2 border-dashed rounded-lg p-6 text-sm text-muted-foreground text-center"
            onDragOver={(e) => e.preventDefault()}
            onDrop={async (e) => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                await handleImageUpload(e.dataTransfer.files);
                e.dataTransfer.clearData();
              }
            }}
          >
            Drag and drop images here to upload
          </div>
          <div className="space-y-3">
            {images.map((url, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="https://image-url..."
                  value={url}
                  onChange={(e) => {
                    const updated = [...images];
                    updated[index] = e.target.value;
                    setImages(updated);
                  }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setImages(images.filter((_, i) => i !== index))}
                >
                  Remove
                </Button>
              </div>
            ))}
            {images.length === 0 && (
              <p className="text-sm text-muted-foreground">No images added yet.</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Pricing Variants</h3>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setVariants([
                  ...variants,
                  {
                    label: '',
                    price: 0,
                    currency: 'NGN',
                    bedrooms: null,
                    bathrooms: null,
                    size: '',
                    sizeUnit: '',
                    paymentType: 'OUTRIGHT',
                    upfrontPercent: null,
                    installmentMonths: null,
                    installmentAmount: null,
                    active: true,
                  },
                ])
              }
            >
              Add Variant
            </Button>
          </div>
          <div className="space-y-4">
            {variants.map((variant, index) => (
              <div key={index} className="rounded-lg border p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Label (e.g. 2 Bedroom, 1 Plot)"
                    value={variant.label}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[index].label = e.target.value;
                      setVariants(updated);
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Price"
                    value={variant.price}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[index].price = Number(e.target.value);
                      setVariants(updated);
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Currency"
                    value={variant.currency}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[index].currency = e.target.value;
                      setVariants(updated);
                    }}
                  />
                  <Input
                    placeholder="Size (e.g. 200sqm, 1 Plot)"
                    value={variant.size || ''}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[index].size = e.target.value;
                      setVariants(updated);
                    }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <Input
                    type="number"
                    placeholder="Bedrooms"
                    value={variant.bedrooms ?? ''}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[index].bedrooms = e.target.value ? Number(e.target.value) : null;
                      setVariants(updated);
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Bathrooms"
                    value={variant.bathrooms ?? ''}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[index].bathrooms = e.target.value ? Number(e.target.value) : null;
                      setVariants(updated);
                    }}
                  />
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={variant.sizeUnit || ''}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[index].sizeUnit = e.target.value;
                      setVariants(updated);
                    }}
                  >
                    <option value="">Unit</option>
                    <option value="SQM">SQM</option>
                    <option value="PLOT">Plot</option>
                    <option value="ACRE">Acre</option>
                    <option value="ROOM">Room</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={variant.paymentType || 'OUTRIGHT'}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[index].paymentType = e.target.value;
                      setVariants(updated);
                    }}
                  >
                    <option value="OUTRIGHT">Outright</option>
                    <option value="INSTALLMENT">Installment</option>
                  </select>
                  <Input
                    type="number"
                    placeholder="Upfront %"
                    value={variant.upfrontPercent ?? ''}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[index].upfrontPercent = e.target.value ? Number(e.target.value) : null;
                      setVariants(updated);
                    }}
                  />
                </div>
                <div className="flex items-center justify-between rounded-md border border-dashed px-3 py-2">
                  <span className="text-sm text-muted-foreground">Availability</span>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={variant.active ?? true}
                      onChange={(e) => {
                        const updated = [...variants];
                        updated[index].active = e.target.checked;
                        setVariants(updated);
                      }}
                    />
                    Active
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    placeholder="Installment months"
                    value={variant.installmentMonths ?? ''}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[index].installmentMonths = e.target.value ? Number(e.target.value) : null;
                      setVariants(updated);
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Installment amount"
                    value={variant.installmentAmount ?? ''}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[index].installmentAmount = e.target.value ? Number(e.target.value) : null;
                      setVariants(updated);
                    }}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setVariants(variants.filter((_, i) => i !== index))}
                  >
                    Remove Variant
                  </Button>
                </div>
              </div>
            ))}
            {variants.length === 0 && (
              <p className="text-sm text-muted-foreground">No variants added yet.</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Media (Flyer / Video)</h3>
            <div className="flex items-center gap-2">
              <label className="inline-flex items-center gap-2 text-sm font-medium">
                <input
                  type="file"
                  accept="image/*,application/pdf,video/*"
                  multiple
                  className="hidden"
                  onChange={async (e) => {
                    if (!e.target.files || e.target.files.length === 0) return;
                    await handleMediaUpload(e.target.files);
                    e.target.value = '';
                  }}
                />
                <Button type="button" variant="outline" disabled={uploadingMedia}>
                  {uploadingMedia ? 'Uploading...' : 'Upload Media'}
                </Button>
              </label>
              <Button
                type="button"
                variant="outline"
                onClick={() => setMedia([...media, { type: 'VIDEO', title: '', url: '' }])}
              >
                Add URL
              </Button>
            </div>
          </div>
          <div
            className="border-2 border-dashed rounded-lg p-6 text-sm text-muted-foreground text-center"
            onDragOver={(e) => e.preventDefault()}
            onDrop={async (e) => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                await handleMediaUpload(e.dataTransfer.files);
                e.dataTransfer.clearData();
              }
            }}
          >
            Drag and drop flyers, PDFs, or videos here to upload
          </div>
          <div className="space-y-3">
            {media.map((item, index) => (
              <div key={index} className="rounded-lg border p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={item.type}
                    onChange={(e) => {
                      const updated = [...media];
                      updated[index].type = e.target.value;
                      setMedia(updated);
                    }}
                  >
                    <option value="VIDEO">Video</option>
                    <option value="FLYER">Flyer</option>
                    <option value="BROCHURE">Brochure</option>
                    <option value="OTHER">Other</option>
                  </select>
                  <Input
                    placeholder="Title (optional)"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...media];
                      updated[index].title = e.target.value;
                      setMedia(updated);
                    }}
                  />
                </div>
                <Input
                  placeholder="Media URL"
                  value={item.url}
                  onChange={(e) => {
                    const updated = [...media];
                    updated[index].url = e.target.value;
                    setMedia(updated);
                  }}
                />
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setMedia(media.filter((_, i) => i !== index))}
                  >
                    Remove Media
                  </Button>
                </div>
              </div>
            ))}
            {media.length === 0 && (
              <p className="text-sm text-muted-foreground">No media added yet.</p>
            )}
          </div>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
           {loading ? 'Saving...' : 'Save Property'}
        </Button>
      </form>
    </Form>
  );
}
