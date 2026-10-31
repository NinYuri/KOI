import { useState, useEffect } from 'react'
import './DishForm.css'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'
const CATEGORIES = ['Entradas', 'Rolls', 'Nigiri', 'Combos', 'Postres', 'Bebidas']
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 2 * 1024 * 1024   // 2 MB

const initialValues = { name: '', description: '', price: '', category: '' }

function validate(values, image) {
    const errors = {}
    const name = values.name.trim()
    const description = values.description.trim()
    const price = Number(values.price)

    if (!name) errors.name = 'El nombre es obligatorio.'
    else if (name.length < 3) errors.name = 'Mínimo 3 caracteres.'
    else if (name.length > 40) errors.name = 'Máximo 40 caracteres.'

    if (!description) errors.description = 'La descripción es obligatoria.'
    else if (description.length < 10) errors.description = 'Mínimo 10 caracteres.'
    else if (description.length > 120) errors.description = 'Máximo 120 caracteres.'

    if (values.price === '') errors.price = 'El precio es obligatorio.'
    else if (!Number.isFinite(price) || price <= 0) errors.price = 'Ingresa un precio mayor a 0.'
    else if (price > 99999) errors.price = 'El precio es demasiado alto.'

    if (!values.category) errors.category = 'Selecciona una categoría.'

    if (!image) errors.image = 'La imagen es obligatoria.'
    else if (!ALLOWED_TYPES.includes(image.type)) errors.image = 'Solo se permiten JPG, PNG o WebP.'
    else if (image.size > MAX_SIZE) errors.image = 'La imagen no debe pesar más de 2 MB.'

    return errors
}

function DishForm({ onSuccess }) {
    const [values, setValues] = useState(initialValues)
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [touched, setTouched] = useState({})
    const [dragging, setDragging] = useState(false)
    const [status, setStatus] = useState('idle')   // idle | sending | success | error
    const [serverError, setServerError] = useState('')

    const errors = validate(values, image)

    // Vista previa de la imagen
    useEffect(() => {
        if (!image) { setPreview(null); return }
        const url = URL.createObjectURL(image)
        setPreview(url)
        return () => URL.revokeObjectURL(url)
    }, [image])

    const showError = (field) => touched[field] && errors[field]

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues((v) => ({ ...v, [name]: value }))
        if (status === 'success') setStatus('idle')
    }

    const handleBlur = (e) => {
        setTouched((t) => ({ ...t, [e.target.name]: true }))
    }

    const pickImage = (file) => {
        setImage(file ?? null)
        setTouched((t) => ({ ...t, image: true }))
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setDragging(false)
        pickImage(e.dataTransfer.files?.[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mostrar todos los errores de validación
        setTouched({
            name: true,
            description: true,
            price: true,
            category: true,
            image: true
        });

        if(Object.keys(errors).length > 0) return;

        try {
            setStatus('sending');
            setServerError('');

            // Obtener token temporal del administrador
            const token = sessionStorage.getItem('koi_admin_token');

            if(!token)
                throw new Error('No se encontró el token de administrador.');

            // Preparar los datos
            const formData = new FormData();

            formData.append('name', values.name.trim());
            formData.append('description', values.description.trim());
            formData.append('price', values.price);
            formData.append('category', values.category);
            formData.append('image', image);

            // Enviar solicitud al backend
            const res = await fetch(`${API_URL}/api/products`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            const data = await res.json();

            if(!res.ok)
                throw new Error(data.message || 'No pudimos guardar el platillo.');

            // Registro exitoso
            setStatus('success');

            setValues(initialValues);
            setImage(null);
            setTouched({});

            onSuccess?.(data);
        } catch (err) {
            console.error('Error al registrar el platillo:', err);
            setStatus('error');
            setServerError(err.message || 'No pudimos guardar el platillo. Intenta de nuevo.');
        } finally {
            setStatus(prev => prev === 'sending' ? 'idle' : prev);
        }
    };

    return (
        <section className="dish-form-section section">
            <h1 className="section-name">Nuevo <span>Platillo</span></h1>
            <p className="section-description">Completa los datos para agregarlo al menú.</p>

            <form className="dish-form" onSubmit={handleSubmit} noValidate>

                {/* ---------- Imagen ---------- */}
                <div className="form-field">
                    <span className="form-label">Imagen</span>

                    <label
                        htmlFor="image"
                        className={`dropzone ${dragging ? 'is-dragging' : ''} ${showError('image') ? 'has-error' : ''}`}
                        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={handleDrop}
                    >
                        {preview ? (
                            <img src={preview} alt="Vista previa del platillo" className="dropzone-preview" />
                        ) : (
                            <span className="dropzone-text">
                                <strong>Haz clic</strong> o arrastra una imagen aquí
                                <small>JPG, PNG o WebP · máx. 2 MB</small>
                            </span>
                        )}
                    </label>

                    <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="visually-hidden"
                        onChange={(e) => pickImage(e.target.files?.[0])}
                        aria-invalid={!!showError('image')}
                        aria-describedby={showError('image') ? 'image-error' : undefined}
                    />

                    {showError('image') && <p id="image-error" className="form-error" role="alert">{errors.image}</p>}
                    {image && (
                        <button type="button" className="form-link" onClick={() => pickImage(null)}>
                            Quitar imagen
                        </button>
                    )}
                </div>

                {/* ---------- Nombre ---------- */}
                <div className="form-field">
                    <label className="form-label" htmlFor="name">Nombre</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        maxLength={40}
                        placeholder="Spring Rolls"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!showError('name')}
                        aria-describedby={showError('name') ? 'name-error' : undefined}
                    />
                    {showError('name') && <p id="name-error" className="form-error" role="alert">{errors.name}</p>}
                </div>

                {/* ---------- Descripción ---------- */}
                <div className="form-field">
                    <label className="form-label" htmlFor="description">Descripción</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        maxLength={120}
                        placeholder="Rollitos crujientes rellenos de camarón y vegetales."
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!showError('description')}
                        aria-describedby={showError('description') ? 'description-error' : undefined}
                    />
                    <span className="form-counter">{values.description.length}/120</span>
                    {showError('description') && <p id="description-error" className="form-error" role="alert">{errors.description}</p>}
                </div>

                {/* ---------- Precio y categoría ---------- */}
                <div className="form-row">
                    <div className="form-field">
                        <label className="form-label" htmlFor="price">Precio ($)</label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            inputMode="decimal"
                            min="0"
                            step="0.01"
                            placeholder="75"
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={!!showError('price')}
                            aria-describedby={showError('price') ? 'price-error' : undefined}
                        />
                        {showError('price') && <p id="price-error" className="form-error" role="alert">{errors.price}</p>}
                    </div>

                    <div className="form-field">
                        <label className="form-label" htmlFor="category">Categoría</label>
                        <select
                            id="category"
                            name="category"
                            value={values.category}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={!!showError('category')}
                            aria-describedby={showError('category') ? 'category-error' : undefined}
                        >
                            <option value="">Selecciona…</option>
                            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                        {showError('category') && <p id="category-error" className="form-error" role="alert">{errors.category}</p>}
                    </div>
                </div>

                {/* ---------- Envío ---------- */}
                <button type="submit" className="form-button" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Guardando…' : 'Agregar platillo'}
                </button>

                {status === 'success' && <p className="form-message is-success" role="status">¡Platillo agregado con éxito!</p>}
                {status === 'error' && <p className="form-message is-error" role="alert">{serverError}</p>}
            </form>
        </section>
    )
}

export default DishForm