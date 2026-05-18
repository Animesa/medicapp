import { sequelize, Catalogos, CatalogoValores, Usuarios } from '../models/index.js'

export const seedCatalogos = async () => {
    try {
        console.log('Verificando/Insertando catálogos iniciales...');

        // 1. TIPOS DE DOCUMENTO
        const [tipoDocCat] = await Catalogos.findOrCreate({
            where: { nombre: 'TIPOS DE DOCUMENTO' },
            defaults: { descripcion: 'Tipos de documentos de identificación', activo: true }
        });

        const tiposDocumentos = [
            { clave: 'CC', valor: 'Cédula de Ciudadania' },
            { clave: 'TI', valor: 'Tarjeta de Identidad' },
            { clave: 'CE', valor: 'Cédula de Extranjeria' },
            { clave: 'PA', valor: 'Pasaporte' },
            { clave: 'PT', valor: 'Permiso Temporal' }
        ];

        for (const td of tiposDocumentos) {
            await CatalogoValores.findOrCreate({
                where: { id_catalogo: tipoDocCat.id, clave: td.clave },
                defaults: { valor: td.valor, activo: true }
            });
        }

        // 2. ESTADOS CITAS
        const [estadosCat] = await Catalogos.findOrCreate({
            where: { nombre: 'ESTADOS CITAS' },
            defaults: { descripcion: 'Estados para clasificar las citas médicas', activo: true }
        });

        const estados = [
            { clave: '1', valor: 'Pendiente' },
            { clave: '2', valor: 'Completada' },
            { clave: '3', valor: 'Cancelada' }
        ];

        for (const est of estados) {
            await CatalogoValores.findOrCreate({
                where: { id_catalogo: estadosCat.id, clave: est.clave },
                defaults: { valor: est.valor, activo: true }
            });
        }

        // 3. ESPECIALIDADES
        const [especialidadesCat] = await Catalogos.findOrCreate({
            where: { nombre: 'ESPECIALIDADES' },
            defaults: { descripcion: 'Especialidades médicas', activo: true }
        });

        const especialidades = [
            { clave: '999', valor: 'No Especificado' },
            { clave: '120', valor: 'Cardiología' },
            { clave: '550', valor: 'Pediatría' },
            { clave: '341', valor: 'Ginecología y Obstetricia' },
            { clave: '200', valor: 'Dermatología' },
            { clave: '480', valor: 'Oftalmología' },
            { clave: '514', valor: 'Ortopedia y Traumatología' }
        ];

        for (const esp of especialidades) {
            await CatalogoValores.findOrCreate({
                where: { id_catalogo: especialidadesCat.id, clave: esp.clave },
                defaults: { valor: esp.valor, activo: true }
            });
        }

        // 4. ROLES
        const [rolesCat] = await Catalogos.findOrCreate({
            where: { nombre: 'ROLES' },
            defaults: { descripcion: 'Roles del sistema', activo: true }
        });

        const roles = [
            { clave: '1', valor: 'Administrador' },
            { clave: '2', valor: 'Médico' },
            { clave: '3', valor: 'Paciente' }
        ];

        for (const rol of roles) {
            await CatalogoValores.findOrCreate({
                where: { id_catalogo: rolesCat.id, clave: rol.clave },
                defaults: { valor: rol.valor, activo: true }
            });
        }

        // 5. USUARIO DEFAULT
        const adminUser = await Usuarios.findOrCreate({
            where: { user_id: 'admin' },
            defaults: { user_id: 'admin', user_name: 'Administrador', user_lastname: 'MedicAPP', email: 'admin@medicapp.com', password: 'admin', rolId: '1' }
        });


        console.log('✅ Catálogos sincronizados correctamente.');
    } catch (error) {
        console.error('❌ Error ejecutando las semillas:', error);
        throw error;
    }
};

if (import.meta.url === `file://${process.argv[1]}`) {
    sequelize.authenticate().then(async () => {
        try {
            await seedCatalogos();
            process.exit(0);
        } catch (e) {
            process.exit(1);
        }
    });
}
