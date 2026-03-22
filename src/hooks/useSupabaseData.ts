import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

// =================== TYPES ===================
export interface Teacher {
  id: string;
  name: string;
  subject: string;
  qualification: string;
  experience: string;
  photo_url?: string;
  created_at?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  image_url?: string;
  created_at?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image_url?: string;
  created_at?: string;
}

export interface Album {
  id: string;
  name: string;
  description: string;
  cover_image_url?: string;
  created_at?: string;
}

export interface GalleryImage {
  id: string;
  album_id: string;
  image_url: string;
  caption?: string;
  created_at?: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  category: 'past-paper' | 'book' | 'notes';
  file_type: 'pdf' | 'docx';
  subject: string;
  class_level: string;
  file_url?: string;
  upload_date: string;
  created_at?: string;
}

export interface TimetableEntry {
  id: string;
  class_name: string;
  day: string;
  period: number;
  period_name?: string;
  start_time?: string;
  end_time?: string;
  time?: string;
  subject: string;
  teacher: string;
}

export interface StudentResult {
  id: string;
  name: string;
  roll_number: string;
  photo_url?: string;
  class_name: string;
  exam_type: string;
  year?: string;
  obtained_marks: number;
  total_marks: number;
  percentage: number;
  position: number;
  created_at?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image_url?: string;
  created_at?: string;
}

export interface SchoolInfo {
  id: string;
  name: string;
  full_name: string;
  description: string;
  mission: string;
  vision: string;
  total_students: number;
  pass_rate: number;
  total_teachers: number;
  established_year: number;
  established?: number;
  address: string;
  phone: string;
  email: string;
  logo_url?: string;
  banner_url?: string;
  principal_name?: string;
  principal_message?: string;
  principal_photo_url?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  category?: 'events' | 'lectures' | 'announcements';
  video_url?: string;
  youtube_url?: string;
  created_at?: string;
}

export interface Notification {
  id: string;
  user_id?: string;
  type: 'notice' | 'result' | 'news' | 'library' | 'video' | 'general';
  message: string;
  is_read: boolean;
  created_at: string;
}

// =================== HELPERS ===================
function initials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

async function createBroadcastNotification(type: Notification['type'], message: string) {
  const { error } = await supabase.from('notifications').insert({
    type,
    message,
    user_id: null,
    is_read: false,
  });
  if (error) {
    console.warn('Notification create skipped:', error.message);
  }
}

// =================== TEACHERS ===================
export function useTeachers() {
  return useQuery({
    queryKey: ['teachers'],
    queryFn: async () => {
      const { data, error } = await supabase.from('teachers').select('*').order('created_at', { ascending: true });
      if (error) throw error;
      return (data || []) as Teacher[];
    },
  });
}

export function useMutateTeacher() {
  const qc = useQueryClient();
  const upsert = useMutation({
    mutationFn: async (teacher: Partial<Teacher> & { id?: string }) => {
      if (teacher.id) {
        const { error } = await supabase.from('teachers').update(teacher).eq('id', teacher.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('teachers').insert(teacher);
        if (error) throw error;
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['teachers'] }); },
  });
  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('teachers').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['teachers'] }); },
  });
  return { upsert, remove };
}

// =================== NOTICES ===================
export function useNotices() {
  return useQuery({
    queryKey: ['notices'],
    queryFn: async () => {
      const { data, error } = await supabase.from('notices').select('*').order('date', { ascending: false });
      if (error) throw error;
      return (data || []) as Notice[];
    },
  });
}

export function useMutateNotice() {
  const qc = useQueryClient();
  const upsert = useMutation({
    mutationFn: async (notice: Partial<Notice> & { id?: string }) => {
      if (notice.id) {
        const { error } = await supabase.from('notices').update(notice).eq('id', notice.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('notices').insert(notice);
        if (error) throw error;
        if (notice.title) {
          await createBroadcastNotification('notice', `New notice: ${notice.title}`);
        }
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['notices'] }); },
  });
  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('notices').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['notices'] }); },
  });
  return { upsert, remove };
}

// =================== NEWS ===================
export function useNews() {
  return useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data, error } = await supabase.from('news').select('*').order('date', { ascending: false });
      if (error) throw error;
      return (data || []) as NewsItem[];
    },
  });
}

export function useMutateNews() {
  const qc = useQueryClient();
  const upsert = useMutation({
    mutationFn: async (item: Partial<NewsItem> & { id?: string }) => {
      if (item.id) {
        const { error } = await supabase.from('news').update(item).eq('id', item.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('news').insert(item);
        if (error) throw error;
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['news'] }); },
  });
  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('news').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['news'] }); },
  });
  return { upsert, remove };
}

// =================== GALLERY ===================
export function useAlbums() {
  return useQuery({
    queryKey: ['albums'],
    queryFn: async () => {
      const { data, error } = await supabase.from('gallery_albums').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []) as Album[];
    },
  });
}

export function useGalleryImages(albumId?: string) {
  return useQuery({
    queryKey: ['gallery_images', albumId],
    queryFn: async () => {
      let q = supabase.from('gallery_images').select('*').order('created_at', { ascending: false });
      if (albumId) q = q.eq('album_id', albumId);
      const { data, error } = await q;
      if (error) throw error;
      return (data || []) as GalleryImage[];
    },
    enabled: !!albumId || albumId === undefined,
  });
}

export function useMutateAlbum() {
  const qc = useQueryClient();
  const upsert = useMutation({
    mutationFn: async (album: Partial<Album> & { id?: string }) => {
      if (album.id) {
        const { error } = await supabase.from('gallery_albums').update(album).eq('id', album.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('gallery_albums').insert(album);
        if (error) throw error;
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['albums'] }); },
  });
  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('gallery_albums').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['albums'] }); },
  });
  return { upsert, remove };
}

export function useMutateGalleryImage() {
  const qc = useQueryClient();
  const add = useMutation({
    mutationFn: async (img: Partial<GalleryImage>) => {
      const { error } = await supabase.from('gallery_images').insert(img);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['gallery_images'] }); },
  });
  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('gallery_images').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['gallery_images'] }); },
  });
  return { add, remove };
}

// =================== LIBRARY ===================
export function useLibrary() {
  return useQuery({
    queryKey: ['library'],
    queryFn: async () => {
      const { data, error } = await supabase.from('library_files').select('*').order('upload_date', { ascending: false });
      if (error) throw error;
      return (data || []) as LibraryItem[];
    },
  });
}

export function useMutateLibrary() {
  const qc = useQueryClient();
  const upsert = useMutation({
    mutationFn: async (item: Partial<LibraryItem> & { id?: string }) => {
      if (item.id) {
        const { error } = await supabase.from('library_files').update(item).eq('id', item.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('library_files').insert(item);
        if (error) throw error;
        if (item.title) {
          await createBroadcastNotification('library', `New library upload: ${item.title}`);
        }
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['library'] }); },
  });
  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('library_files').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['library'] }); },
  });
  return { upsert, remove };
}

// =================== TIMETABLE ===================
export function useTimetable(className: string) {
  return useQuery({
    queryKey: ['timetable', className],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('timetable')
        .select('*')
        .eq('class_name', className)
        .order('day')
        .order('period');
      if (error) throw error;
      return (data || []) as TimetableEntry[];
    },
  });
}

export function useMutateTimetable() {
  const qc = useQueryClient();

  const normalizeLegacyTime = (entry: Partial<TimetableEntry>) => {
    const start = entry.start_time?.trim() || '';
    const end = entry.end_time?.trim() || '';
    const legacy = entry.time?.trim() || '';
    return {
      ...entry,
      time: start || end ? `${start} - ${end}`.trim() : legacy,
      period_name: entry.period_name || (entry.period ? `P${entry.period}` : undefined),
    };
  };

  const upsert = useMutation({
    mutationFn: async (entry: Partial<TimetableEntry> & { id?: string }) => {
      const payload = normalizeLegacyTime(entry);
      if (entry.id) {
        const { error } = await supabase.from('timetable').update(payload).eq('id', entry.id);
        if (error) {
          if (/period_name|start_time|end_time/.test(error.message || '')) {
            const { period_name, start_time, end_time, ...legacyPayload } = payload;
            const { error: fallbackError } = await supabase.from('timetable').update(legacyPayload).eq('id', entry.id);
            if (fallbackError) throw fallbackError;
          } else {
            throw error;
          }
        }
      } else {
        const { error } = await supabase.from('timetable').insert(payload);
        if (error) {
          if (/period_name|start_time|end_time/.test(error.message || '')) {
            const { period_name, start_time, end_time, ...legacyPayload } = payload;
            const { error: fallbackError } = await supabase.from('timetable').insert(legacyPayload);
            if (fallbackError) throw fallbackError;
          } else {
            throw error;
          }
        }
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['timetable'] }); },
  });
  const bulkUpsert = useMutation({
    mutationFn: async (entries: Partial<TimetableEntry>[]) => {
      const payload = entries.map(normalizeLegacyTime);
      const { error } = await supabase.from('timetable').upsert(payload as any);
      if (error) {
        if (/period_name|start_time|end_time/.test(error.message || '')) {
          const legacyPayload = payload.map(({ period_name, start_time, end_time, ...rest }) => rest);
          const { error: fallbackError } = await supabase.from('timetable').upsert(legacyPayload as any);
          if (fallbackError) throw fallbackError;
        } else {
          throw error;
        }
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['timetable'] }); },
  });
  return { upsert, bulkUpsert };
}

// =================== RESULTS ===================
export function useResults(className?: string, examType?: string, year?: string) {
  return useQuery({
    queryKey: ['results', className, examType, year],
    queryFn: async () => {
      let q = supabase.from('results').select('*');
      if (className) q = q.eq('class_name', className);
      if (examType) q = q.eq('exam_type', examType);
      if (year) q = q.eq('year', year);
      q = q.order('percentage', { ascending: false });
      const { data, error } = await q;
      if (error) throw error;
      return (data || []).map((r: any, i: number) => ({ ...r, position: i + 1 })) as StudentResult[];
    },
  });
}

export function useMutateResult() {
  const qc = useQueryClient();
  const upsert = useMutation({
    mutationFn: async (result: Partial<StudentResult> & { id?: string }) => {
      const { percentage, position, ...rest } = result as any;
      if (rest.id) {
        const { id, ...updatePayload } = rest;
        const { error } = await supabase.from('results').update(updatePayload).eq('id', id);
        if (error) throw error;
      } else {
        const { id, ...insertPayload } = rest;
        const { error } = await supabase.from('results').insert(insertPayload);
        if (error) throw error;
        await createBroadcastNotification(
          'result',
          `New result published: ${insertPayload.class_name} ${insertPayload.exam_type}${insertPayload.year ? ` (${insertPayload.year})` : ''}`,
        );
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['results'] }); },
  });
  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('results').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['results'] }); },
  });
  return { upsert, remove };
}

// =================== ACHIEVEMENTS ===================
export function useAchievements() {
  return useQuery({
    queryKey: ['achievements'],
    queryFn: async () => {
      const { data, error } = await supabase.from('achievements').select('*').order('date', { ascending: false });
      if (error) throw error;
      return (data || []) as Achievement[];
    },
  });
}

export function useMutateAchievement() {
  const qc = useQueryClient();
  const upsert = useMutation({
    mutationFn: async (item: Partial<Achievement> & { id?: string }) => {
      if (item.id) {
        const { error } = await supabase.from('achievements').update(item).eq('id', item.id);
        if (error) throw error;
      } else {
        const { id, ...insertPayload } = item as any;
        const { error } = await supabase.from('achievements').insert(insertPayload);
        if (error) throw error;
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['achievements'] }); },
  });
  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('achievements').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['achievements'] }); },
  });
  return { upsert, remove };
}

// =================== SCHOOL INFO ===================
export function useSchoolInfo() {
  return useQuery({
    queryKey: ['school_info'],
    queryFn: async () => {
      const { data, error } = await supabase.from('school_info').select('*').limit(1).single();
      if (error && error.code !== 'PGRST116') throw error;
      return data as SchoolInfo | null;
    },
  });
}

export function useMutateSchoolInfo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (info: Partial<SchoolInfo> & { id?: string }) => {
      const payload = {
        ...info,
        established: (info as any).established_year ?? info.established,
      } as any;

      const persist = async (input: any) => {
        if (input.id) {
          const { error } = await supabase.from('school_info').update(input).eq('id', input.id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('school_info').insert(input);
          if (error) throw error;
        }
      };

      try {
        await persist(payload);
      } catch (error: any) {
        if (/established_year/.test(error?.message || '')) {
          const { established_year, ...legacyPayload } = payload;
          await persist(legacyPayload);
        } else {
          throw error;
        }
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['school_info'] }); },
  });
}

// =================== VIDEOS ===================
export function useVideos() {
  return useQuery({
    queryKey: ['videos'],
    queryFn: async () => {
      const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []) as VideoItem[];
    },
  });
}

export function useMutateVideo() {
  const qc = useQueryClient();
  const upsert = useMutation({
    mutationFn: async (item: Partial<VideoItem> & { id?: string }) => {
      if (item.id) {
        const { error } = await supabase.from('videos').update(item).eq('id', item.id);
        if (error) throw error;
      } else {
        const { id, ...payload } = item as any;
        const { error } = await supabase.from('videos').insert(payload);
        if (error) throw error;
        if (item.title) {
          await createBroadcastNotification('video', `New video uploaded: ${item.title}`);
        }
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['videos'] }); },
  });
  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('videos').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['videos'] }); },
  });
  return { upsert, remove };
}

// =================== NOTIFICATIONS ===================
export function useNotifications(userId?: string) {
  const qc = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`notifications-${userId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notifications' },
        (payload) => {
          const next = payload.new as any;
          const prev = payload.old as any;
          const touchesUser = [next?.user_id, prev?.user_id].some((id) => id === null || id === userId);
          if (touchesUser) {
            qc.invalidateQueries({ queryKey: ['notifications', userId] });
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc, userId]);

  return useQuery({
    queryKey: ['notifications', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .or(`user_id.eq.${userId},user_id.is.null`)
        .order('created_at', { ascending: false })
        .limit(50);
      if (error) throw error;
      return (data || []) as Notification[];
    },
    enabled: !!userId,
    refetchInterval: 10000,
  });
}

export function useMutateNotification() {
  const qc = useQueryClient();
  const markRead = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('notifications').update({ is_read: true }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['notifications'] }); },
  });
  const markAllRead = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase.from('notifications').update({ is_read: true }).or(`user_id.eq.${userId},user_id.is.null`).eq('is_read', false);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['notifications'] }); },
  });
  const create = useMutation({
    mutationFn: async (n: Partial<Notification>) => {
      const { error } = await supabase.from('notifications').insert(n);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['notifications'] }); },
  });
  return { markRead, markAllRead, create };
}

// =================== FILE UPLOAD ===================
export async function uploadFile(bucket: string, path: string, file: File) {
  const cleanedPath = path
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9/_.-]/g, '');

  const attemptPath = `${cleanedPath}_${Math.random().toString(36).slice(2, 8)}`;
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(attemptPath, file, { cacheControl: '3600', upsert: false, contentType: file.type || undefined });
  if (error) throw error;
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
  return urlData.publicUrl;
}

export { initials };
