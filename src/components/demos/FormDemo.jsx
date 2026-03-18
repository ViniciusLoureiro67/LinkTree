import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Send,
  Loader2,
} from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { GlassButton } from '../ui/GlassButton';
import { cn } from '../../lib/utils';

const initialFormState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validateField = (name, value, formData) => {
  switch (name) {
    case 'name':
      if (!value) return 'Nome é obrigatório';
      if (value.length < 3) return 'Nome deve ter pelo menos 3 caracteres';
      return null;
    case 'email':
      if (!value) return 'Email é obrigatório';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email inválido';
      return null;
    case 'password':
      if (!value) return 'Senha é obrigatória';
      if (value.length < 6) return 'Senha deve ter pelo menos 6 caracteres';
      if (!/[A-Z]/.test(value)) return 'Senha deve conter uma letra maiúscula';
      if (!/[0-9]/.test(value)) return 'Senha deve conter um número';
      return null;
    case 'confirmPassword':
      if (!value) return 'Confirme sua senha';
      if (value !== formData.password) return 'Senhas não coincidem';
      return null;
    default:
      return null;
  }
};

function InputField({
  label,
  name,
  type = 'text',
  icon: Icon,
  value,
  error,
  touched,
  onChange,
  onBlur,
  showPasswordToggle,
  showPassword,
  onTogglePassword,
}) {
  const hasError = touched && error;
  const isValid = touched && !error && value;

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-white/70">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
          <Icon className="w-5 h-5" />
        </div>
        <input
          type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={cn(
            'w-full pl-10 pr-10 py-2.5 rounded-lg bg-white/5 border text-white placeholder:text-white/30',
            'focus:outline-none focus:ring-2 transition-all duration-200',
            hasError
              ? 'border-red-500/50 focus:ring-red-500/30'
              : isValid
              ? 'border-emerald-500/50 focus:ring-emerald-500/30'
              : 'border-white/10 focus:ring-blue-500/30 focus:border-blue-500/50'
          )}
          placeholder={`Digite seu ${label.toLowerCase()}`}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
        {!showPasswordToggle && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <AnimatePresence mode="wait">
              {hasError && (
                <motion.div
                  key="error"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </motion.div>
              )}
              {isValid && (
                <motion.div
                  key="valid"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
      <AnimatePresence>
        {hasError && (
          <motion.p
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="text-xs text-red-400 flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FormDemo() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validação em tempo real
    if (touched[name]) {
      const error = validateField(name, value, { ...formData, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value, formData);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar todos os campos
    const newTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(newTouched);

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key], formData);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // Simular envio
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset após 3 segundos
    setTimeout(() => {
      setIsSuccess(false);
      setFormData(initialFormState);
      setTouched({});
      setErrors({});
    }, 3000);
  };

  const isFormValid = Object.keys(formData).every(
    (key) => !validateField(key, formData[key], formData)
  );

  return (
    <GlassCard padding="lg" hover={false}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-lg font-semibold text-white">
            Formulário com Validação
          </h3>
          <p className="text-sm text-white/50">
            Validação em tempo real com feedback visual
          </p>
        </div>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-12 space-y-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center"
              >
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </motion.div>
              <div className="text-center">
                <h4 className="text-xl font-semibold text-white">Sucesso!</h4>
                <p className="text-white/60">Cadastro realizado com sucesso</p>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <InputField
                label="Nome"
                name="name"
                icon={User}
                value={formData.name}
                error={errors.name}
                touched={touched.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <InputField
                label="Email"
                name="email"
                type="email"
                icon={Mail}
                value={formData.email}
                error={errors.email}
                touched={touched.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <InputField
                label="Senha"
                name="password"
                icon={Lock}
                value={formData.password}
                error={errors.password}
                touched={touched.password}
                onChange={handleChange}
                onBlur={handleBlur}
                showPasswordToggle
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />

              <InputField
                label="Confirmar Senha"
                name="confirmPassword"
                icon={Lock}
                value={formData.confirmPassword}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                showPasswordToggle
                showPassword={showConfirmPassword}
                onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              />

              <GlassButton
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
                loading={isSubmitting}
                icon={isSubmitting ? null : <Send className="w-5 h-5" />}
                iconPosition="right"
              >
                {isSubmitting ? 'Enviando...' : 'Cadastrar'}
              </GlassButton>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Info */}
        <div className="flex items-center gap-2 text-sm text-white/40 pt-2 border-t border-white/5">
          <span>💡</span>
          <span>
            <strong className="text-white/60">Funcionalidades:</strong> Validação em tempo real, Feedback visual, Estados de loading
          </span>
        </div>
      </div>
    </GlassCard>
  );
}
