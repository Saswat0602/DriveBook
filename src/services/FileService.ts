import { Paths, File } from 'expo-file-system';

export class FileService {
  /**
   * Copies a file to the app's document directory so it persists safely.
   */
  static async saveFileToAppStorage(sourceUri: string): Promise<string> {
    if (!sourceUri.startsWith('file://')) {
      // If it's already a content URI or remote, we might need to download it.
      // Assuming expo-image-picker returns a file URI in cache.
      return sourceUri;
    }

    const filename = sourceUri.split('/').pop() || `file_${Date.now()}`;
    const destinationFile = new File(Paths.document, filename);

    try {
      const sourceFile = new File(sourceUri);
      await sourceFile.copy(destinationFile);
      return destinationFile.uri;
    } catch (error) {
      console.error('Error saving file:', error);
      throw error;
    }
  }

  static async deleteFile(uri: string): Promise<void> {
    if (uri && uri.startsWith('file://')) {
      try {
        const file = new File(uri);
        await file.delete();
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
  }
}
