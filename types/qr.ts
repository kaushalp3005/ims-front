// types/qr.ts - Complete QR functionality types
export interface QRPayload {
    company: string
    entry_date: string
    vendor_name: string
    customer_name: string
    item_description: string
    net_weight: number
    total_weight: number // This is gross weight from boxes
    batch_number: string
    manufacturing_date?: string
    expiry_date?: string
    box_number: number
    transaction_no: string
    sku_id: number
    approval_authority?: string
  }
  
  export interface QRLabel {
    box_number: number
    article_description: string
    qr_payload: QRPayload
    qr_data: string
  }
  
  export interface QRLabelRequest {
    transaction_no: string
    company: string
    box_numbers: number[]
  }
  
  export interface QRLabelResponse {
    transaction_no: string
    company: string
    labels: QRLabel[]
  }
  
  export interface PrinterInfo {
    name: string
    type: 'USB' | 'WiFi' | 'Bluetooth' | 'Network'
    status: 'online' | 'offline' | 'busy'
    supports_label_printing: boolean
    max_width_inches?: number
    max_height_inches?: number
    dpi?: number
  }
  
  export interface PrintJobRequest {
    transaction_no: string
    company: string
    box_numbers: number[]
    printer_name?: string
    print_settings?: PrintSettings
  }
  
  export interface PrintJobResponse {
    job_id: string
    status: string
    labels_count: number
    created_at: string
  }
  
  export interface PrintSettings {
    width: string // e.g., "4in"
    height: string // e.g., "2in"
    dpi: number // e.g., 203
    orientation: 'portrait' | 'landscape'
    copies: number
  }
  
  export interface PrintCapabilities {
    canPrint: boolean
    isMobile: boolean
    isIOS: boolean
    isAndroid: boolean
    userAgent: string
    supports: {
      webPrint: boolean
      popups: boolean
      qrGeneration: boolean
    }
  }
  
  export interface QRLabelDimensions {
    width_inches: number
    height_inches: number
    width_px: number
    height_px: number
    dpi: number
    qr_size_px: number
  }
  
  // Standard label dimensions
  export const LABEL_DIMENSIONS: QRLabelDimensions = {
    width_inches: 4,
    height_inches: 2,
    width_px: 812, // 4 inches * 203 DPI
    height_px: 406, // 2 inches * 203 DPI
    dpi: 203,
    qr_size_px: 170
  }
  
  // Validation interface
  export interface ValidationResult {
    isValid: boolean
    errors: string[]
    warnings?: string[]
  }
  
  // Print status tracking
  export interface PrintStatus {
    job_id: string
    status: 'queued' | 'printing' | 'completed' | 'failed' | 'cancelled'
    progress: number // 0-100
    message?: string
    created_at: string
    completed_at?: string
    error_message?: string
  }
  
  // Print queue management
  export interface PrintQueue {
    jobs: PrintStatus[]
    active_job?: PrintStatus
    total_jobs: number
    completed_jobs: number
    failed_jobs: number
  }
  
  // Label generation options
  export interface LabelGenerationOptions {
    include_vendor_name?: boolean
    include_customer_name?: boolean
    include_batch_number?: boolean
    include_manufacturing_date?: boolean
    include_expiry_date?: boolean
    qr_error_correction_level?: 'L' | 'M' | 'Q' | 'H'
    font_size?: 'small' | 'medium' | 'large'
  }
  
  // Printer detection result
  export interface PrinterDetectionResult {
    printers: PrinterInfo[]
    total_count: number
    detection_status: 'success' | 'partial' | 'failed' | 'limited'
    detection_methods_used: string[]
    errors?: string[]
  }
  
  // Export utility functions interface
  export interface QRUtilities {
    formatDate(dateString: string): string
    validateQRPayload(payload: Partial<QRPayload>): ValidationResult
    calculateQRSize(containerWidth: number, containerHeight: number, dpi?: number): number
    generateCompactQRData(payload: QRPayload): string
    parseQRData(qrData: string): Partial<QRPayload>
  }
  
  // Print job creation options
  export interface PrintJobOptions {
    printer_name?: string
    print_quality?: 'draft' | 'normal' | 'high'
    paper_type?: 'label' | 'continuous' | 'fanfold'
    print_speed?: 'slow' | 'medium' | 'fast'
    darkness?: number // 0-15 for thermal printers
    copies?: number
    collate?: boolean
    reverse_print?: boolean // Print from last page to first
  }
  
  // Extended print job request with options
  export interface ExtendedPrintJobRequest extends PrintJobRequest {
    options?: PrintJobOptions
    callback_url?: string // For webhook notifications
    metadata?: Record<string, any> // Additional data
  }
  
  // QR code generation options
  export interface QRGenerationOptions {
    size?: number
    error_correction_level?: 'L' | 'M' | 'Q' | 'H'
    margin?: number
    background_color?: string
    foreground_color?: string
    include_margin?: boolean
  }
  
  // Label layout configuration
  export interface LabelLayout {
    qr_section: {
      width_percent: number
      padding: string
      alignment: 'left' | 'center' | 'right'
    }
    info_section: {
      width_percent: number
      padding: string
      font_sizes: {
        title: string
        content: string
        footer: string
      }
      line_height: number
    }
    border: {
      width: string
      color: string
      style: 'solid' | 'dashed' | 'dotted'
    }
  }
  
  // Default label layout
  export const DEFAULT_LABEL_LAYOUT: LabelLayout = {
    qr_section: {
      width_percent: 50,
      padding: '0.1in',
      alignment: 'center'
    },
    info_section: {
      width_percent: 50,
      padding: '0.1in',
      font_sizes: {
        title: '9pt',
        content: '8pt',
        footer: '7pt'
      },
      line_height: 1.1
    },
    border: {
      width: '1px',
      color: '#000',
      style: 'solid'
    }
  }
  
  // Batch processing interface
  export interface BatchPrintRequest {
    transactions: Array<{
      transaction_no: string
      company: string
      box_numbers: number[]
    }>
    printer_name?: string
    print_settings?: PrintSettings
    options?: PrintJobOptions
  }
  
  export interface BatchPrintResponse {
    batch_id: string
    total_jobs: number
    jobs: PrintJobResponse[]
    estimated_completion_time?: string
    total_labels: number
  }
