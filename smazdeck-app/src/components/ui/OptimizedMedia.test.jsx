import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { OptimizedMedia, OptimizedMediaGallery, OptimizedAvatar } from './OptimizedMedia';
import { useResponsive } from '../../hooks/useResponsive';

// Mock the useResponsive hook
vi.mock('../../hooks/useResponsive');

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
window.IntersectionObserver = mockIntersectionObserver;

describe('OptimizedMedia', () => {
  beforeEach(() => {
    useResponsive.mockReturnValue({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      windowSize: { width: 1024, height: 768 }
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Image Loading', () => {
    it('renders image with basic props', () => {
      render(
        <OptimizedMedia
          src="/test-image.jpg"
          alt="Test image"
          lazy={false}
        />
      );

      const image = screen.getByAltText('Test image');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/test-image.jpg');
    });

    it('shows loading state initially', () => {
      render(
        <OptimizedMedia
          src="/test-image.jpg"
          alt="Test image"
          lazy={false}
        />
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('shows error state when image fails to load', async () => {
      render(
        <OptimizedMedia
          src="/invalid-image.jpg"
          alt="Test image"
          lazy={false}
        />
      );

      const image = screen.getByAltText('Test image');
      fireEvent.error(image);

      await waitFor(() => {
        expect(screen.getByText('Failed to load')).toBeInTheDocument();
      });
    });

    it('shows custom fallback when provided', async () => {
      const customFallback = <div>Custom fallback content</div>;
      
      render(
        <OptimizedMedia
          src="/invalid-image.jpg"
          alt="Test image"
          lazy={false}
          fallback={customFallback}
        />
      );

      const image = screen.getByAltText('Test image');
      fireEvent.error(image);

      await waitFor(() => {
        expect(screen.getByText('Custom fallback content')).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Behavior', () => {
    it('uses mobile source on mobile devices', () => {
      useResponsive.mockReturnValue({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
        windowSize: { width: 375, height: 667 }
      });

      render(
        <OptimizedMedia
          src="/default-image.jpg"
          alt="Test image"
          lazy={false}
          sizes={{
            mobile: '/mobile-image.jpg',
            desktop: '/desktop-image.jpg',
            default: '/default-image.jpg'
          }}
        />
      );

      const image = screen.getByAltText('Test image');
      expect(image).toHaveAttribute('src', '/mobile-image.jpg');
    });

    it('uses desktop source on desktop devices', () => {
      render(
        <OptimizedMedia
          src="/default-image.jpg"
          alt="Test image"
          lazy={false}
          sizes={{
            mobile: '/mobile-image.jpg',
            desktop: '/desktop-image.jpg',
            default: '/default-image.jpg'
          }}
        />
      );

      const image = screen.getByAltText('Test image');
      expect(image).toHaveAttribute('src', '/desktop-image.jpg');
    });

    it('generates srcSet when multiple sizes provided', () => {
      render(
        <OptimizedMedia
          src="/default-image.jpg"
          alt="Test image"
          lazy={false}
          sizes={{
            small: '/small-image.jpg',
            mobile: '/mobile-image.jpg',
            desktop: '/desktop-image.jpg'
          }}
        />
      );

      const image = screen.getByAltText('Test image');
      expect(image).toHaveAttribute('srcset');
      expect(image.getAttribute('srcset')).toContain('/small-image.jpg 320w');
      expect(image.getAttribute('srcset')).toContain('/mobile-image.jpg 640w');
    });
  });

  describe('Lazy Loading', () => {
    it('sets up intersection observer for lazy loading', () => {
      render(
        <OptimizedMedia
          src="/test-image.jpg"
          alt="Test image"
          lazy={true}
        />
      );

      expect(mockIntersectionObserver).toHaveBeenCalled();
    });

    it('loads immediately when priority is true', () => {
      render(
        <OptimizedMedia
          src="/test-image.jpg"
          alt="Test image"
          lazy={true}
          priority={true}
        />
      );

      const image = screen.getByAltText('Test image');
      expect(image).toHaveAttribute('loading', 'eager');
    });

    it('uses lazy loading when priority is false', () => {
      render(
        <OptimizedMedia
          src="/test-image.jpg"
          alt="Test image"
          lazy={true}
          priority={false}
        />
      );

      // Image should not be rendered initially due to lazy loading
      expect(screen.queryByAltText('Test image')).not.toBeInTheDocument();
    });
  });

  describe('Video Support', () => {
    it('renders video element when type is video', () => {
      render(
        <OptimizedMedia
          src="/test-video.mp4"
          alt="Test video"
          type="video"
          lazy={false}
        />
      );

      const video = document.querySelector('video');
      expect(video).toBeInTheDocument();
      expect(video).toHaveAttribute('src', '/test-video.mp4');
      expect(video).toHaveAttribute('controls');
    });

    it('sets preload attribute based on priority', () => {
      render(
        <OptimizedMedia
          src="/test-video.mp4"
          type="video"
          lazy={false}
          priority={true}
        />
      );

      const video = document.querySelector('video');
      expect(video).toHaveAttribute('preload', 'auto');
    });
  });

  describe('Aspect Ratio', () => {
    it('applies correct aspect ratio classes', () => {
      const { container } = render(
        <OptimizedMedia
          src="/test-image.jpg"
          alt="Test image"
          aspectRatio="16/9"
          lazy={false}
        />
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('aspect-video');
    });

    it('applies square aspect ratio', () => {
      const { container } = render(
        <OptimizedMedia
          src="/test-image.jpg"
          alt="Test image"
          aspectRatio="square"
          lazy={false}
        />
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('aspect-square');
    });
  });

  describe('Click Handling', () => {
    it('calls onClick when clicked', () => {
      const mockOnClick = vi.fn();
      
      const { container } = render(
        <OptimizedMedia
          src="/test-image.jpg"
          alt="Test image"
          lazy={false}
          onClick={mockOnClick}
        />
      );

      fireEvent.click(container.firstChild);
      expect(mockOnClick).toHaveBeenCalled();
    });

    it('adds cursor-pointer class when onClick is provided', () => {
      const { container } = render(
        <OptimizedMedia
          src="/test-image.jpg"
          alt="Test image"
          lazy={false}
          onClick={() => {}}
        />
      );

      expect(container.firstChild).toHaveClass('cursor-pointer');
    });
  });
});

describe('OptimizedMediaGallery', () => {
  const mockItems = [
    { id: 1, src: '/image1.jpg', alt: 'Image 1', caption: 'First image' },
    { id: 2, src: '/image2.jpg', alt: 'Image 2', caption: 'Second image' },
    { id: 3, src: '/image3.jpg', alt: 'Image 3', caption: 'Third image' }
  ];

  beforeEach(() => {
    useResponsive.mockReturnValue({
      isMobile: false,
      isTablet: false,
      isDesktop: true
    });
  });

  it('renders gallery with multiple items', () => {
    render(
      <OptimizedMediaGallery
        items={mockItems}
        lazy={false}
      />
    );

    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
    expect(screen.getByAltText('Image 2')).toBeInTheDocument();
    expect(screen.getByAltText('Image 3')).toBeInTheDocument();
  });

  it('shows captions when provided', () => {
    render(
      <OptimizedMediaGallery
        items={mockItems}
        lazy={false}
      />
    );

    expect(screen.getByText('First image')).toBeInTheDocument();
    expect(screen.getByText('Second image')).toBeInTheDocument();
    expect(screen.getByText('Third image')).toBeInTheDocument();
  });

  it('calls onItemClick when item is clicked', () => {
    const mockOnItemClick = vi.fn();
    
    render(
      <OptimizedMediaGallery
        items={mockItems}
        lazy={false}
        onItemClick={mockOnItemClick}
      />
    );

    const firstImage = screen.getByAltText('Image 1');
    fireEvent.click(firstImage.closest('div'));

    expect(mockOnItemClick).toHaveBeenCalledWith(mockItems[0], 0);
  });

  it('adjusts grid columns based on responsive settings', () => {
    useResponsive.mockReturnValue({
      isMobile: true,
      isTablet: false,
      isDesktop: false
    });

    const { container } = render(
      <OptimizedMediaGallery
        items={mockItems}
        cols={{ sm: 1, md: 2, lg: 3 }}
        lazy={false}
      />
    );

    expect(container.firstChild).toHaveClass('grid-cols-1');
  });
});

describe('OptimizedAvatar', () => {
  beforeEach(() => {
    useResponsive.mockReturnValue({
      isMobile: false,
      isTablet: false,
      isDesktop: true
    });
  });

  it('renders avatar with image', () => {
    const { container } = render(
      <OptimizedAvatar
        src="/avatar.jpg"
        alt="User avatar"
        name="John Doe"
      />
    );

    // Check that the avatar container is rendered
    expect(container.querySelector('.rounded-full')).toBeInTheDocument();
  });

  it('shows initials when image fails to load', async () => {
    render(
      <OptimizedAvatar
        src=""
        alt="User avatar"
        name="John Doe"
      />
    );

    // Should show initials when no src is provided
    await waitFor(() => {
      expect(screen.getByText('JD')).toBeInTheDocument();
    });
  });

  it('shows custom fallback when provided', async () => {
    const customFallback = <div>Custom Avatar</div>;
    
    render(
      <OptimizedAvatar
        src=""
        alt="User avatar"
        name="John Doe"
        fallback={customFallback}
      />
    );

    // Should show custom fallback when no src is provided
    await waitFor(() => {
      expect(screen.getByText('Custom Avatar')).toBeInTheDocument();
    });
  });

  it('shows online status indicator when enabled', () => {
    const { container } = render(
      <OptimizedAvatar
        src="/avatar.jpg"
        alt="User avatar"
        name="John Doe"
        showOnlineStatus={true}
        isOnline={true}
      />
    );

    const statusIndicator = container.querySelector('.bg-green-500');
    expect(statusIndicator).toBeInTheDocument();
  });

  it('shows offline status indicator', () => {
    const { container } = render(
      <OptimizedAvatar
        src="/avatar.jpg"
        alt="User avatar"
        name="John Doe"
        showOnlineStatus={true}
        isOnline={false}
      />
    );

    const statusIndicator = container.querySelector('.bg-slate-500');
    expect(statusIndicator).toBeInTheDocument();
  });

  it('applies different sizes correctly', () => {
    const { container } = render(
      <OptimizedAvatar
        src="/avatar.jpg"
        alt="User avatar"
        name="John Doe"
        size="lg"
      />
    );

    const avatar = container.querySelector('.w-14');
    expect(avatar).toBeInTheDocument();
  });

  it('adjusts size for mobile devices', () => {
    useResponsive.mockReturnValue({
      isMobile: true,
      isTablet: false,
      isDesktop: false
    });

    const { container } = render(
      <OptimizedAvatar
        src="/avatar.jpg"
        alt="User avatar"
        name="John Doe"
        size="md"
      />
    );

    const avatar = container.querySelector('.w-12');
    expect(avatar).toBeInTheDocument();
  });
});