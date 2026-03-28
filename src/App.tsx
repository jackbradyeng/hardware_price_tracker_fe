import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { LandingPage } from '@/pages/LandingPage';
import { ProductListPage } from '@/pages/ProductListPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/gpus" element={<ProductListPage type="gpu" />} />
                    <Route path="/cpus" element={<ProductListPage type="cpu" />} />
                    <Route path="/ram" element={<ProductListPage type="ram" />} />
                    <Route path="/workstation_gpus" element={<ProductListPage type="workstation_gpu" />} />
                    <Route path="/gpu_pricepoints/:modelNumber" element={<ProductDetailPage type="gpu" />} />
                    <Route path="/cpu_pricepoints/:modelNumber" element={<ProductDetailPage type="cpu" />} />
                    <Route path="/ram_pricepoints/:modelNumber" element={<ProductDetailPage type="ram" />} />
                    <Route path="/workstation_gpu_pricepoints/:modelNumber" element={<ProductDetailPage type="workstation_gpu" />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
